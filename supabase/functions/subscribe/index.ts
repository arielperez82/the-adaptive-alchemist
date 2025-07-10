// Purpose: Secure newsletter subscribe endpoint with double opt-in, IP/email rate limiting, and disposable email detection using is-disposable-email.

import { isEmail } from '@onisaint/validate-email'
import { createClient } from '@supabase/supabase-js'
import isDisposableEmail from 'is-disposable-email'
import { Resend } from 'resend'
import { serve } from 'std/http/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, firstName = '', lastName = '' } = await req.json()

    if (!isEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Disposable/burner email check
    if (isDisposableEmail(email)) {
      return new Response(
        JSON.stringify({
          error: 'Disposable email addresses are not allowed.'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (firstName.trim() === '') {
      return new Response(JSON.stringify({ error: 'First name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabase = createClient(
      Deno.env.get!('SUPABASE_URL') ?? '',
      Deno.env.get!('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Abuse prevention: check attempts by IP and email
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    // Check attempts by IP (more important for abuse prevention)
    const { count: ipAttempts } = await supabase
      .from('subscription_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('created_at', oneHourAgo)

    if (ipAttempts && ipAttempts >= 10) {
      return new Response(
        JSON.stringify({
          error: 'Too many attempts from this IP. Please try again later.'
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check attempts by email
    const { count: emailAttempts } = await supabase
      .from('subscription_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', oneHourAgo)

    if (emailAttempts && emailAttempts >= 3) {
      return new Response(
        JSON.stringify({
          error: 'Too many attempts for this email. Please try again later.'
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Record attempt
    await supabase
      .from('subscription_attempts')
      .insert([{ email, ip_address: clientIP }])

    // Create or get user
    let user
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      user = existingUser
      // Update user info if provided
      if (firstName || lastName) {
        const updates: Record<string, string> = {}
        if (firstName) updates.first_name = firstName
        if (lastName) updates.last_name = lastName
        updates.updated_at = new Date().toISOString()

        const { data: updatedUser } = await supabase
          .from('users')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single()

        user ||= updatedUser
      }
    } else {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([
          {
            email,
            first_name: firstName,
            last_name: lastName
          }
        ])
        .select()
        .single()

      if (userError) {
        console.error('Error creating user:', userError)
        throw new Error('Failed to create user')
      }
      user = newUser
    }

    // Check for existing subscription
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('subscribed_at', { ascending: false })
      .limit(1)
      .single()

    let subscription
    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return new Response(
          JSON.stringify({
            error: 'Already subscribed to this newsletter.'
          }),
          {
            status: 409,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      if (existingSubscription.status === 'pending') {
        // Check if recent confirmation was sent (within 10 minutes)
        const tenMinutesAgo = new Date(Date.now() - 1 * 60 * 1000).toISOString()
        const { count: recentConfirmations } = await supabase
          .from('email_confirmations')
          .select('*', { count: 'exact', head: true })
          .eq('subscription_id', existingSubscription.id)
          .gte('created_at', tenMinutesAgo)

        if (recentConfirmations && recentConfirmations > 0) {
          return new Response(
            JSON.stringify({
              error:
                'Confirmation email sent recently. Please check your inbox.'
            }),
            {
              status: 429,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }
        subscription = existingSubscription
      } else if (existingSubscription.status === 'cancelled') {
        // Reactivate subscription
        const { data: reactivatedSub, error: updateError } = await supabase
          .from('subscriptions')
          .update({
            status: 'pending',
            subscribed_at: new Date().toISOString()
          })
          .eq('id', existingSubscription.id)
          .select()
          .single()

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          throw new Error('Failed to reactivate subscription')
        }
        subscription = reactivatedSub
      }
    } else {
      // Create new subscription
      const { data: newSubscription, error: subError } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: user.id,
            status: 'pending'
          }
        ])
        .select()
        .single()

      if (subError) {
        console.error('Error creating subscription:', subError)
        throw new Error('Failed to create subscription')
      }
      subscription = newSubscription
    }

    // Invalidate any old unused confirmation tokens for this subscription
    await supabase
      .from('email_confirmations')
      .update({ used_at: new Date().toISOString() })
      .eq('subscription_id', subscription.id)
      .is('used_at', null)

    // Create new confirmation token with 24-hour expiry
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const { data: confirmation, error: confirmError } = await supabase
      .from('email_confirmations')
      .insert([
        {
          subscription_id: subscription.id,
          purpose: 'subscription_confirm',
          expires_at: expiresAt
        }
      ])
      .select()
      .single()

    if (confirmError) {
      console.error('Error creating confirmation token:', confirmError)
      throw new Error('Failed to create confirmation token')
    }

    console.log(
      `Sending confirmation email to ${email} with token ${confirmation.token}`
    )

    // Send confirmation email
    const resend = new Resend(Deno.env.get!('RESEND_API_KEY'))
    const siteUrl =
      Deno.env.get('SITE_URL') || 'https://www.adaptivealchemist.com'

    const { data, error } = await resend.emails.send({
      from: 'The Adaptive Alchemist <the-adaptive-alchemist@newsletter.adaptivealchemist.com>',
      to: email,
      subject: 'Confirm your subscription to The Adaptive Alchemist',
      html: `
        <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #374151; max-width: 600px; margin: 0 auto; padding: 1.5rem;">
          <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #111827; font-family: Inter, sans-serif; font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Confirm your subscription</h2>
            <p style="color: #374151; font-family: Inter, sans-serif; line-height: 1.7; margin: 1.25rem 0;">Click the link below to confirm your subscription:</p>
            <div style="text-align: center; margin: 1.25rem 0;">
              <a href="${siteUrl}/confirm?token=${confirmation.token}" style="display: inline-block; background: #9d6ddb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-family: Inter, sans-serif;">Confirm Subscription</a>
            </div>
            <p style="color: #6b7280; font-family: Inter, sans-serif; line-height: 1.7; margin: 1.25rem 0;">If the link won't open when clicked, paste the following URL directly into your browser:</p>
            <p style="word-break: break-all; color: #6b7280; font-size: 14px; font-family: Inter, sans-serif; margin: 1.25rem 0;">${siteUrl}/confirm?token=${confirmation.token}</p>
            <p style="color: #374151; font-family: Inter, sans-serif; line-height: 1.7; margin: 1.25rem 0;">If you did not request this, you can ignore this email.</p>
          </div>
        </div>
      `
    })

    if (error) {
      console.error('Error sending confirmation email:', error)
      throw new Error(error.message)
    }

    console.log(`Confirmation email sent to ${email} with id:`, data?.id)
    return new Response(
      JSON.stringify({
        message: 'Confirmation email sent. Please check your inbox.',
        subscription_id: subscription.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
