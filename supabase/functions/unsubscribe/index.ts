import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { serve } from 'std/http/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type'
}

const headers = {
  ...corsHeaders,
  'Content-Type': 'application/json'
}

// Type definitions for the flattened nested query result
interface User {
  id: string
  email: string
  first_name: string
  last_name: string
}

interface Subscription {
  id: string
  status: string
  users: User
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { emailId } = await req.json()

    if (!emailId) {
      return new Response(JSON.stringify({ error: 'Email Id required' }), {
        status: 400,
        headers
      })
    }

    const supabase = createClient(
      Deno.env.get!('SUPABASE_URL') ?? '',
      Deno.env.get!('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First, get the subscription to check if it exists and get user email
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select(
        `
        id,
        status,
        users (
          id,
          email,
          first_name,
          last_name
        )
      `
      )
      .eq('id', emailId)
      .single()

    if (fetchError || !subscription) {
      return new Response(JSON.stringify({ error: 'Subscription not found' }), {
        status: 404,
        headers
      })
    }

    // First, mark as unsubscribe_requested
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ status: 'unsubscribe_requested' })
      .eq('id', emailId)

    if (updateError) {
      throw updateError
    }

    const typedSubscription = subscription as unknown as Subscription
    const user = typedSubscription.users

    // Update contact in Resend Audience to unsubscribed (priority)
    if (user) {
      try {
        const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '')
        const audienceId = Deno.env.get('RESEND_AUDIENCE_ID') ?? ''

        // Try to update the contact directly - if it doesn't exist, this will fail gracefully
        await resend.contacts.update({
          email: user.email,
          audienceId,
          unsubscribed: true
        })

        // If Resend unsubscribe was successful, mark as unsubscribed in our database
        await supabase
          .from('subscriptions')
          .update({ status: 'unsubscribed' })
          .eq('id', emailId)
      } catch (resendError) {
        // Log error but don't fail the unsubscribe process
        console.error(
          'Failed to update contact in Resend audience:',
          resendError
        )
        // Keep status as 'unsubscribe_requested' since Resend failed
      }
    } else {
      // If no user found, mark as unsubscribed anyway
      await supabase
        .from('subscriptions')
        .update({ status: 'unsubscribed' })
        .eq('id', emailId)
    }

    return new Response(
      JSON.stringify({ message: 'Unsubscribed successfully' }),
      {
        status: 200,
        headers
      }
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers
    })
  }
})
