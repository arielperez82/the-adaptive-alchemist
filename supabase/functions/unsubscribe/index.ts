import { createClient } from '@supabase/supabase-js'
import { serve } from 'std/http/server'
import { Webhook } from 'svix'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type'
}

const headers = {
  ...corsHeaders,
  'Content-Type': 'application/json'
}

// Type definitions for Resend webhook events
interface ContactUpdatedEvent {
  type: 'contact.updated'
  data: {
    id: string
    email: string
    firstName?: string
    lastName?: string
    unsubscribed: boolean
    audienceId: string
    createdAt: string
    updatedAt: string
  }
}

// Verify webhook signature
function verifyWebhookSignature(
  payload: string,
  headers: Headers,
  secret: string
): ContactUpdatedEvent | undefined {
  try {
    const wh = new Webhook(secret)
    // Throws on error, returns the verified content on success
    return wh.verify(
      payload,
      Object.fromEntries(headers.entries())
    ) as ContactUpdatedEvent
  } catch (error) {
    console.error('Error verifying webhook signature:', error)
    return
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const webhookSecret = Deno.env.get('RESEND_CONTACT_UPDATE_WEBHOOK_SECRET')

    if (!webhookSecret) {
      return new Response(JSON.stringify({ error: 'Missing webhook secret' }), {
        status: 401,
        headers
      })
    }

    // Get the raw body for signature verification
    const body = await req.text()
    // Verify the webhook signature
    const event = verifyWebhookSignature(body, req.headers, webhookSecret)

    if (!event) {
      return new Response(
        JSON.stringify({ error: 'Invalid webhook signature' }),
        {
          status: 401,
          headers
        }
      )
    }

    if (event.type === 'contact.updated') {
      const { email, unsubscribed } = event.data

      if (unsubscribed) {
        // Find and update the subscription in Supabase
        const supabase = createClient(
          Deno.env.get!('SUPABASE_URL') ?? '',
          Deno.env.get!('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Find the user by email
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single()

        if (userError || !user) {
          console.error(`User not found for email: ${email}`)
        } else {
          // Update all active subscriptions for this user
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update({
              status: 'unsubscribed',
              unsubscribed_at: new Date().toISOString()
            })
            .eq('user_id', user.id)
            .in('status', ['active', 'pending'])

          if (updateError) {
            console.error(
              `Error updating subscription for user ${user.id}:`,
              updateError
            )
          } else {
            console.log(`Successfully unsubscribed user ${user.id}`)
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ message: 'Webhook processed successfully' }),
      {
        status: 200,
        headers
      }
    )
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers
    })
  }
})
