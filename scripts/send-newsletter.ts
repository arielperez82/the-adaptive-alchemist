import { readFileSync } from 'fs'
import matter from 'gray-matter'

interface NewsletterPayload {
  articleSlug: string
  articleTitle: string
  articleDescription: string
  articleAuthor: string
  articlePubDate: string
  articleMarkdown: string
  articleUrl: string
  forceSend?: boolean
}

async function sendNewsletter(
  articlePath: string,
  forceSend: boolean = false
): Promise<void> {
  try {
    const fileContent = readFileSync(articlePath, 'utf-8')
    const slug = articlePath.split('/').pop()?.replace('.md', '') || ''

    const { data, content } = matter(fileContent)

    // Skip if article is marked as draft
    if (data.draft === 'true') {
      console.log('Skipping draft article:', slug)
      return
    }

    if (!data.title || !data.description || !data.pubDate) {
      throw new Error(
        'Missing required frontmatter fields: title, description, or pubDate'
      )
    }

    const payload: NewsletterPayload = {
      articleSlug: slug,
      articleTitle: data.title,
      articleDescription: data.description,
      articleAuthor: data.author || 'Ariel Pérez',
      articlePubDate: data.pubDate,
      articleMarkdown: content,
      articleUrl: `${process.env.SITE_URL}/${slug}`,
      forceSend
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        'Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
      )
    }

    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-newsletter`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const result = await response.json()

    if (result.alreadySent) {
      console.log('Article has already been broadcast. Use --force to resend.')
    } else {
      console.log('Newsletter sent successfully')
    }
  } catch (error) {
    console.error('Failed to send newsletter:', error)
    process.exit(1)
  }
}

const articlePath = process.argv[2]
const forceSend = process.argv.includes('--force')

if (!articlePath) {
  console.error('Usage: tsx send-newsletter.ts <article-path> [--force]')
  process.exit(1)
}

sendNewsletter(articlePath, forceSend)
