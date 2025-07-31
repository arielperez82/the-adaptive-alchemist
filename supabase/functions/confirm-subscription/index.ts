import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { serve } from 'std/http/server'

// Type definitions for the flattened nested query result
interface User {
  id: string
  email: string
  first_name: string
  last_name: string
}

interface Subscription {
  id: string
  user_id: string
  status: string
  users: User
}

interface ConfirmationData {
  id: string
  subscription_id: string
  expires_at: string
  used_at: string | null
  attempt_count: number
  subscriptions: Subscription
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type'
}

const headers = {
  ...corsHeaders,
  'Content-Type': 'application/json'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token required' }), {
        status: 400,
        headers
      })
    }

    const supabase = createClient(
      Deno.env.get!('SUPABASE_URL') ?? '',
      Deno.env.get!('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get confirmation token with related subscription and user data
    const { data: confirmationData, error: confirmationError } = await supabase
      .from('email_confirmations')
      .select(
        `
        id,
        subscription_id,
        expires_at,
        used_at,
        attempt_count,
        subscriptions (
          id,
          user_id,
          status,
          users (
            id,
            email,
            first_name,
            last_name
          )
        )
      `
      )
      .eq('token', token)
      .eq('purpose', 'subscription_confirm')
      .single()

    if (confirmationError || !confirmationData) {
      return new Response(
        JSON.stringify({ error: 'Invalid confirmation token' }),
        {
          status: 400,
          headers
        }
      )
    }

    // Type assertion to help TypeScript understand the nested structure
    const typedConfirmationData =
      confirmationData as unknown as ConfirmationData

    // Check if token has already been used
    if (typedConfirmationData.used_at) {
      return new Response(
        JSON.stringify({ error: 'Token has already been used' }),
        {
          status: 400,
          headers
        }
      )
    }

    // Check if token has expired
    if (new Date(typedConfirmationData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Confirmation token has expired' }),
        {
          status: 400,
          headers
        }
      )
    }

    // Check attempt count for rate limiting
    if (typedConfirmationData.attempt_count >= 3) {
      return new Response(
        JSON.stringify({ error: 'Too many confirmation attempts' }),
        {
          status: 429,
          headers
        }
      )
    }

    // Get subscription and user data with proper typing
    const subscription = typedConfirmationData.subscriptions
    const user = subscription.users

    if (!subscription || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid subscription data' }),
        {
          status: 400,
          headers
        }
      )
    }

    // Increment attempt count
    await supabase
      .from('email_confirmations')
      .update({ attempt_count: typedConfirmationData.attempt_count + 1 })
      .eq('id', typedConfirmationData.id)

    // Add to Resend Audience using the correct API
    const resend = new Resend(Deno.env.get!('RESEND_API_KEY') ?? '')
    const audienceId = Deno.env.get!('RESEND_AUDIENCE_ID') ?? ''
    const siteUrl =
      Deno.env.get('SITE_URL') || 'https://www.adaptivealchemist.com'

    try {
      await resend.contacts.create({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        unsubscribed: false,
        audienceId
      })

      // Send welcome email
      await resend.emails.send({
        from: 'The Adaptive Alchemist <the-adaptive-alchemist@newsletter.adaptivealchemist.com>',
        to: user.email,
        subject: 'Welcome to The Adaptive Alchemist Newsletter!',
        html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to The Adaptive Alchemist Newsletter!</title>
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
        
        .welcome-title {
          color: #18181b;
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 16px 0;
          text-align: center;
          line-height: 1.1;
        }
        
        .welcome-content {
          color: #3f3f46;
          line-height: 1.7;
          margin: 16px 0 24px 0;
          font-size: 16px;
        }
        
        .welcome-content p {
          margin: 20px 0;
          line-height: 1.7;
        }
        
        .welcome-content strong {
          color: #18181b;
          font-weight: 600;
        }
        
        .welcome-content ul {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        .welcome-content li {
          margin: 8px 0;
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
          
          .newsletter-title, .welcome-title {
            color: #fafafa;
            border-color: #27272a;
          }
          
          .welcome-content {
            color: #a1a1aa;
          }
          
          .welcome-content strong {
            color: #fafafa;
          }
          
          .footer-text, .unsubscribe-link {
            color: #71717a;
          }
        }
      </style>
    </head>
    <body>
      <div class="newsletter-container">
        <div class="newsletter-header">
          <h1 class="newsletter-title">The Adaptive Alchemist</h1>
          
          <h2 class="welcome-title">Welcome to The Adaptive Alchemist Newsletter!</h2>
          
          <div class="welcome-content">
            <p>Hi ${user.first_name},</p>
            
            <p>You've successfully joined <strong>thousands of leaders and innovators</strong> who are transforming how organizations work in the age of AI and complexity.</p>
            
            <p>You'll receive weekly insights on:</p>
            
            <ul>
              <li>Adaptive leadership that creates conditions for teams to thrive</li>
              <li>Fluid organizations where people flow to problems that matter</li>
              <li>The alchemy of structure and knowing which boundaries matter and which to break</li>
              <li>Technological enablement and the levers that let you move fast without blowing things up</li>
            </ul>
            
            <p><strong>Ready to get started?</strong></p>
            
            <div style="text-align: center; margin: 24px 0;">
              <a href="${siteUrl}/posts?utm_source=newsletter&utm_medium=email" class="cta-button">Explore our Latest Articles</a>
            </div>
            
            <p>Your first newsletter will arrive in the next few days. If you change your mind, you can unsubscribe anytime using the link in our emails.</p>
            
            <p>Let's turn chaos into gold. Not with magic, but with a little alchemy, and a lot of candor.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
      })

      // Update subscription status to active and set confirmed_at
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          confirmed_at: new Date().toISOString()
        })
        .eq('id', subscription.id)

      // Mark confirmation token as used
      await supabase
        .from('email_confirmations')
        .update({ used_at: new Date().toISOString() })
        .eq('id', typedConfirmationData.id)

      // Invalidate other unused confirmation tokens for this subscription
      await supabase
        .from('email_confirmations')
        .update({ used_at: new Date().toISOString() })
        .eq('subscription_id', subscription.id)
        .neq('id', typedConfirmationData.id)
        .is('used_at', null)

      return new Response(
        JSON.stringify({
          message: 'Subscription confirmed',
          subscription_id: subscription.id
        }),
        {
          status: 200,
          headers
        }
      )
    } catch (resendError: unknown) {
      // Handle case where email already exists in audience
      if (
        resendError &&
        typeof resendError === 'object' &&
        'statusCode' in resendError &&
        resendError.statusCode === 409
      ) {
        // Update subscription status to active (already subscribed to Resend)
        await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            confirmed_at: new Date().toISOString()
          })
          .eq('id', subscription.id)

        // Mark confirmation token as used
        await supabase
          .from('email_confirmations')
          .update({ used_at: new Date().toISOString() })
          .eq('id', typedConfirmationData.id)

        // Invalidate other unused confirmation tokens for this subscription
        await supabase
          .from('email_confirmations')
          .update({ used_at: new Date().toISOString() })
          .eq('subscription_id', subscription.id)
          .neq('id', typedConfirmationData.id)
          .is('used_at', null)

        return new Response(
          JSON.stringify({
            message: 'Already subscribed',
            subscription_id: subscription.id
          }),
          {
            status: 200,
            headers
          }
        )
      }

      console.error('Resend error:', resendError)
      throw resendError
    }
  } catch (error) {
    console.error('Confirmation error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers
    })
  }
})
