import { createClient } from '@supabase/supabase-js'
import MarkdownIt from 'markdown-it'
import { Resend } from 'resend'
import { serve } from 'std/http/server'

import { generateNewsletterHTML, stripHtmlFromMarkdown } from './utils.ts'

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
    // Disable HTML block rule to prevent HTML comments from being processed
    const md = new MarkdownIt({
      html: false,
      linkify: true,
      typographer: true
    }).disable(['html_block'])

    const cleanedArticleMarkdown = stripHtmlFromMarkdown(articleMarkdown)

    // Convert markdown to email-safe HTML
    const articleHtml = md.render(cleanedArticleMarkdown)

    // Create broadcast using Resend's Broadcast API
    const { data } = await resend.broadcasts.create({
      name: articleTitle,
      audienceId,
      subject: articleTitle,
      previewText: articleDescription,
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
        cleanedArticleMarkdown,
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
