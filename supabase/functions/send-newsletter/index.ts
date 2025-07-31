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
        articleAuthor,
        articlePublishDate
      ),
      text: generateNewsletterText(
        articleTitle,
        articleDescription,
        articleUrl,
        articleMarkdown,
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
  author?: string,
  publishDate?: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark"> 
      <title>${title}</title>
      <style>
        /* Email-safe CSS reset and base styles */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        /* Custom prose styles matching blog */
        .prose {
          color: #3f3f46; /* zinc-700 equivalent */
          line-height: 1.7;
          font-size: 16px;
        }
        
        .prose h1 {
          color: #18181b; /* zinc-900 equivalent */
          font-size: 40px;
          font-weight: 700;
          line-height: 1.2;
          margin: 40px 0 24px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #e4e4e7; /* zinc-200 equivalent */
        }
        
        .prose h2 {
          color: #18181b;
          font-size: 32px;
          font-weight: 600;
          line-height: 1.2;
          margin: 40px 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #e4e4e7;
        }
        
        .prose h3 {
          color: #18181b;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
          margin: 32px 0 16px 0;
        }
        
        .prose h4 {
          color: #18181b;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.2;
          margin: 24px 0 12px 0;
        }
        
        .prose p {
          margin: 20px 0;
          line-height: 1.7;
        }
        
        .prose a {
          color: #9333ea; /* purple-600 equivalent */
          text-decoration: none;
          border-bottom: 1px solid transparent;
        }
        
        .prose a:hover {
          color: #7c3aed; /* purple-700 equivalent */
          border-bottom-color: #a855f7; /* purple-500 equivalent */
        }
        
        .prose strong {
          color: #18181b;
          font-weight: 600;
        }
        
        .prose em {
          font-style: italic;
        }
        
        .prose ul, .prose ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        .prose li {
          margin: 8px 0;
        }
        
        .prose blockquote {
          border-left: 4px solid #3b82f6; /* blue-500 equivalent */
          background-color: #f8fafc; /* gray-50 equivalent */
          border-radius: 6px;
          padding: 16px 24px;
          margin: 24px 0;
          font-style: italic;
        }
        
        .prose blockquote p {
          margin: 8px 0;
        }
        
        .prose pre {
          background-color: #1e293b; /* slate-800 equivalent */
          color: #e2e8f0; /* gray-200 equivalent */
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          overflow-x: auto;
          font-family: 'Courier New', Consolas, Monaco, monospace;
          font-size: 14px;
          line-height: 1.7;
        }
        
        .prose code {
          background-color: #f1f5f9; /* gray-100 equivalent */
          color: #18181b;
          border-radius: 4px;
          padding: 2px 6px;
          font-family: 'Courier New', Consolas, Monaco, monospace;
          font-size: 14px;
          font-weight: 500;
        }
        
        .prose pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border-radius: 0;
        }
        
        .prose hr {
          border: none;
          border-top: 1px solid #e4e4e7;
          margin: 32px 0;
        }
        
        .prose img {
          margin: 24px 0;
          border-radius: 8px;
          max-width: 100%;
          height: auto;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 14px;
        }
        
        .prose th {
          color: #18181b;
          font-weight: 600;
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #e4e4e7;
        }
        
        .prose td {
          padding: 12px;
          border-bottom: 1px solid #f4f4f5; /* zinc-100 equivalent */
        }
        
        /* Newsletter specific styles */
        .newsletter-container {
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
          background-color: #ffffff; /* white background */
        }
        
        .newsletter-header {
          background: #ffffff; /* white background */
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .newsletter-title {
          color: #18181b;
          font-size: 18px; /* much smaller title */
          font-weight: 700;
          margin: 0 0 32px 0;
          text-align: center;
          border-bottom: 1px solid #e4e4e7;
          padding-bottom: 8px;
        }
        
        .article-title {
          color: #18181b;
          font-size: 40px; /* matches blog h1 size */
          font-weight: 800; /* matches blog h1 weight */
          margin: 0 0 16px 0; /* reduced top margin */
          text-align: center;
          line-height: 1.1; /* tighter line height for large title */
        }
        
        .article-meta {
          margin: 16px 0 24px 0; /* adjusted margins */
          font-size: 14px;
          color: #71717a; /* zinc-500 equivalent to match blog */
          text-align: center;
        }
        
        .article-meta span {
          font-weight: 500;
          font-size: 12px;
        }
        
        .article-description {
          color: #52525c;
          line-height: 1.7;
          margin: 16px 0 24px 0; /* adjusted margins */
          font-size: 16px; /* slightly larger to match blog description */
          text-align: center;
        }
        
        .cta-button {
          display: inline-block;
          background: #9333ea; /* purple-600 equivalent */
          color: white !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 24px 0;
          border: none;
        }
        
        .cta-button:hover {
          background: #7c3aed; /* purple-700 equivalent */
        }
        
        .footer-text {
          font-size: 10px;
          color: #52525b;
          text-align: center;
          margin: 20px 0;
        }
        
        .footer-links {
          color: #9333ea;
          text-decoration: none;
          cursor: pointer;
        }
        
        .unsubscribe-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #e4e4e7;
        }
        
        .unsubscribe-link {
          font-size: 10px;
          color:#9333ea;  /* purple-600 equivalent */
          text-decoration: none;
        }
        
        /* Dark mode styles for supported clients */
        @media (prefers-color-scheme: dark) {
          .newsletter-container {
            background-color: #09090b; /* zinc-950 equivalent */
            color: #a1a1aa; /* zinc-400 equivalent */
          }
          
          .newsletter-header {
            background: #18181b; /* zinc-900 equivalent */
            border-color: #27272a; /* zinc-800 equivalent */
          }
          
          .newsletter-title, .article-title, .prose h1, .prose h2, .prose h3, .prose h4 {
            color: #fafafa; /* zinc-50 equivalent */
            border-color: #27272a;
          }
          
          .prose {
            color: #a1a1aa;
          }
          
          .prose a {
            color: #c084fc; /* purple-400 equivalent */
          }
          
          .prose a:hover {
            color: #a78bfa; /* purple-300 equivalent */
          }
          
          .prose strong {
            color: #fafafa;
          }
          
          .prose blockquote {
            background-color: #18181b;
            border-left-color: #60a5fa; /* blue-400 equivalent */
          }
          
          .prose code {
            background-color: #18181b;
            color: #fafafa;
          }
          
          .prose hr {
            border-color: #27272a;
          }
          
          .article-meta, .article-description {
            color: #9f9fa9; /* zinc-400 equivalent */
          }
          
          .footer-text, .unsubscribe-link {
            color: #71717a;
          }
          
          .footer-links {
            color: #9333ea;
          }
        }
      </style>
    </head>
    <body>
      <div class="newsletter-container">
        <div class="newsletter-header">
          <h1 class="newsletter-title">The Adaptive Alchemist</h1>
          
          <h2 class="article-title">${title}</h2>         
          
          <p class="article-description">${description}</p>
          
          ${
            author || publishDate
              ? `
          <div class="article-meta">
            ${author ? `<span>By ${author}</span>` : ''}
            ${author && publishDate ? ' • ' : ''}
            ${publishDate ? `<span>${publishDate}</span>` : ''}
          </div>
          `
              : ''
          }

          <hr>
          
          <div class="prose">
            ${articleHtml}
          </div>
          
          <hr>
          
          <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="color: #111827; font-family: Inter, sans-serif; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Want to dive deeper?</h3>
            <p style="color: #4b5563; font-family: Inter, sans-serif; line-height: 1.6; margin: 0 0 1.5rem 0; font-size: 1rem;">
              This is just the beginning! The full article contains deeper insights, practical examples, and actionable strategies that could transform how you think about leadership and organizational design.
            </p>
            <a href="${url}?utm_source=newsletter&utm_medium=email" class="cta-button">Continue Reading on the Blog</a>
          </div>
          
          <p class="footer-text">
            Sent to <a href="mailto:{{{EMAIL}}}">{{{EMAIL}}}</a>.
          </p>

          <p class="footer-text">
            You're receiving this because you subscribed to The Adaptive Alchemist newsletter.
            <br><br>
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" class="footer-links">Unsubscribe</a>
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
  text += 'To unsubscribe, please use the unsubscribe link in this email.'

  return text
}
