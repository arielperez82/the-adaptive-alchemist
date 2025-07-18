import { createClient } from '@supabase/supabase-js'
import MarkdownIt from 'markdown-it'
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
    const {
      articleSlug,
      articleTitle,
      articleDescription,
      articleUrl,
      articleMarkdown,
      articleAuthor,
      articlePublishDate,
      subscriptionId,
      forceSend = false
    } = await req.json()

    if (!articleSlug || !articleTitle || !articleMarkdown) {
      return new Response(
        JSON.stringify({
          error: 'Article information and markdown content required'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if this article has already been broadcast
    const { data: existingBroadcasts } = await supabase
      .from('newsletter_sends')
      .select('broadcast_id')
      .eq('article_slug', articleSlug)
      .limit(1)

    if (existingBroadcasts && existingBroadcasts.length > 0 && !forceSend) {
      return new Response(
        JSON.stringify({
          message:
            'Article has already been broadcast. Use forceSend=true to resend.',
          alreadySent: true
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '')
    const audienceId = Deno.env.get('RESEND_AUDIENCE_ID') ?? ''

    // Initialize markdown-it with email-safe options
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    })

    const siteUrl =
      Deno.env.get('SITE_URL') ?? 'https://www.adaptivealchemist.com'

    // Convert markdown to email-safe HTML
    const articleHtml = md.render(articleMarkdown)

    // Create broadcast using Resend's Broadcast API
    const { data } = await resend.broadcasts.create({
      name: articleTitle,
      audienceId,
      subject: articleTitle,
      html: generateNewsletterHTML(
        articleTitle,
        articleDescription,
        articleUrl,
        articleHtml,
        subscriptionId,
        siteUrl,
        articleAuthor,
        articlePublishDate
      ),
      text: generateNewsletterText(
        articleTitle,
        articleDescription,
        articleUrl,
        articleMarkdown,
        subscriptionId,
        siteUrl,
        articleAuthor,
        articlePublishDate
      ),
      from: 'The Adaptive Alchemist <the-adaptive-alchemist@newsletter.adaptivealchemist.com>'
    })

    const broadcastId = data?.id ?? ''

    // Send the broadcast
    await resend.broadcasts.send(broadcastId)

    // Record in Supabase for analytics
    await supabase.from('newsletter_sends').insert([
      {
        article_slug: articleSlug,
        broadcast_id: broadcastId
      }
    ])

    return new Response(
      JSON.stringify({
        message: 'Newsletter sent',
        broadcastId,
        alreadySent: false
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Newsletter error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

function generateNewsletterHTML(
  title: string,
  description: string,
  url: string,
  articleHtml: string,
  subscriptionId: string,
  siteUrl: string,
  author?: string,
  publishDate?: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #374151; max-width: 600px; margin: 0 auto; padding: 1.5rem;">
      <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h1 style="color: #111827; font-family: Inter, sans-serif; font-size: 2.5rem; font-weight: 800; margin: 0 0 1.5rem 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">The Adaptive Alchemist</h1>
        
        <h2 style="color: #111827; font-family: Inter, sans-serif; font-size: 2rem; font-weight: 700; margin: 2.5rem 0 1rem 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">${title}</h2>
        
        <p style="color: #6b7280; font-family: Inter, sans-serif; line-height: 1.7; margin: 1.25rem 0; font-size: 1.125rem;">${description}</p>
        
        ${
          author || publishDate
            ? `
        <div style="margin: 1.5rem 0; font-size: 14px; color: #6b7280; font-family: Inter, sans-serif;">
          ${author ? `<span style="font-weight: 500;">By ${author}</span>` : ''}
          ${author && publishDate ? ' • ' : ''}
          ${publishDate ? `<span>${publishDate}</span>` : ''}
        </div>
        `
            : ''
        }
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0;">
        
        <div style="color: #374151; font-family: Inter, sans-serif; line-height: 1.7; margin: 1.25rem 0;">
          ${articleHtml}
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0;">
        
        <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="color: #111827; font-family: Inter, sans-serif; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Want to dive deeper?</h3>
          <p style="color: #4b5563; font-family: Inter, sans-serif; line-height: 1.6; margin: 0 0 1.5rem 0; font-size: 1rem;">
            This is just the beginning! The full article contains deeper insights, practical examples, and actionable strategies that could transform how you think about leadership and organizational design.
          </p>
          <a href="${url}" style="display: inline-block; background: #9d6ddb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-family: Inter, sans-serif; font-size: 1rem; transition: background-color 0.2s;">Continue Reading on the Blog</a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; text-align: center; font-family: Inter, sans-serif; margin: 1.25rem 0;">
          You're receiving this because you subscribed to The Adaptive Alchemist newsletter.
          <br>
          <a href="{{unsubscribe_url}}" style="color: #9d6ddb; text-decoration: none;">Unsubscribe</a>
        </p>
        <div style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af; font-family: Inter, sans-serif; margin: 0;">
            <a href="${siteUrl}/unsubscribe?emailId=${subscriptionId}" style="color: #9ca3af; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateNewsletterText(
  title: string,
  description: string,
  url: string,
  articleMarkdown: string,
  subscriptionId: string,
  siteUrl: string,
  author?: string,
  publishDate?: string
) {
  const header = 'The Adaptive Alchemist'
  const separator = '='.repeat(header.length)

  let text = `${header}\n${separator}\n\n`
  text += `${title}\n`
  text += '-'.repeat(title.length) + '\n\n'

  if (author || publishDate) {
    const meta = []
    if (author) meta.push(`By ${author}`)
    if (publishDate) meta.push(publishDate)
    text += `${meta.join(' • ')}\n\n`
  }

  text += `${description}\n\n`
  text += '─'.repeat(50) + '\n\n'
  text += `${articleMarkdown}\n\n`
  text += '─'.repeat(50) + '\n\n'
  text += 'Want to dive deeper?\n\n'
  text +=
    'This is just the beginning! The full article contains deeper insights, practical examples, and actionable strategies that could transform how you think about leadership and organizational design.\n\n'
  text += `Continue Reading: ${url}\n\n`
  text +=
    "You're receiving this because you subscribed to The Adaptive Alchemist newsletter.\n"
  text += `To unsubscribe, please visit: ${siteUrl}/unsubscribe?emailId=${subscriptionId}`

  return text
}
