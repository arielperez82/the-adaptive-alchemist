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

// Function to truncate markdown to first 3 H2 sections
function truncateToFirstXH2s(markdown: string, x: number = 3): string {
  const lines = markdown.split('\n')
  const h2Indices: number[] = []

  // Find all H2 headings (## )
  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('###')
    ) {
      h2Indices.push(i)
    }
  }

  // If we have 3 or fewer H2s, return the full content
  if (h2Indices.length <= x) {
    return markdown
  }

  // Return content up to the end of the 3rd H2 section
  const endIndex = h2Indices[x] - 1 // Stop before the 4th H2
  return lines.slice(0, endIndex).join('\n')
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

    // Truncate markdown to first 3 H2 sections
    const truncatedMarkdown = truncateToFirstXH2s(content)

    const payload: NewsletterPayload = {
      articleSlug: slug,
      articleTitle: data.title,
      articleDescription: data.description,
      articleAuthor: data.author || 'Ariel Pérez',
      articlePubDate: data.pubDate,
      articleMarkdown: truncatedMarkdown,
      articleUrl: `${process.env.SITE_URL}/${slug}`,
      forceSend
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !publishableKey) {
      throw new Error(
        'Missing required environment variables: SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY'
      )
    }

    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-newsletter`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${publishableKey}`,
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
      console.log('Article has already been sent. Use --force to resend.')
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
