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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm your subscription to The Adaptive Alchemist</title>
      <style>
        /* Email-safe CSS reset and base styles */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        /* Newsletter specific styles */
        .newsletter-container {
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
          background-color: #ffffff;
        }
        
        .newsletter-header {
          background: #ffffff;
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .newsletter-title {
          color: #18181b;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 32px 0;
          text-align: center;
          border-bottom: 1px solid #e4e4e7;
          padding-bottom: 8px;
        }
        
        .confirm-title {
          color: #18181b;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 16px 0;
          text-align: center;
          line-height: 1.1;
        }
        
        .confirm-content {
          color: #3f3f46;
          line-height: 1.7;
          margin: 16px 0 24px 0;
          font-size: 16px;
        }
        
        .confirm-content p {
          margin: 20px 0;
          line-height: 1.7;
        }
        
        .cta-button {
          display: inline-block;
          background: #9333ea;
          color: white !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 24px 0;
          border: none;
        }
        
        .cta-button:hover {
          background: #7c3aed;
        }
        
        .fallback-url {
          word-break: break-all;
          color: #71717a;
          font-size: 14px;
          font-family: 'Courier New', Consolas, Monaco, monospace;
          background-color: #f1f5f9;
          padding: 12px;
          border-radius: 6px;
          margin: 16px 0;
          border: 1px solid #e4e4e7;
        }
        
        .footer-text {
          font-size: 14px;
          color: #52525b;
          text-align: center;
          margin: 20px 0;
        }
        
        /* Dark mode styles for supported clients */
        @media (prefers-color-scheme: dark) {
          .newsletter-container {
            background-color: #09090b;
            color: #a1a1aa;
          }
          
          .newsletter-header {
            background: #18181b;
            border-color: #27272a;
          }
          
          .newsletter-title, .confirm-title {
            color: #fafafa;
            border-color: #27272a;
          }
          
          .confirm-content {
            color: #a1a1aa;
          }
          
          .fallback-url {
            background-color: #18181b;
            color: #a1a1aa;
            border-color: #27272a;
          }
          
          .footer-text {
            color: #71717a;
          }
        }
      </style>
    </head>
    <body>
      <div class="newsletter-container">
        <div class="newsletter-header">
          <h1 class="newsletter-title">The Adaptive Alchemist</h1>
          
          <h2 class="confirm-title">Confirm your subscription</h2>
          
          <div class="confirm-content">
            <p>Click the link below to confirm your subscription:</p>
            
            <div style="text-align: center; margin: 24px 0;">
              <a href="${siteUrl}/confirm?token=${confirmation.token}" class="cta-button">Confirm Subscription</a>
            </div>
            
            <p>If the link won't open when clicked, paste the following URL directly into your browser:</p>
            
            <div class="fallback-url">${siteUrl}/confirm?token=${confirmation.token}</div>
            
            <p>If you did not request this, you can ignore this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
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
