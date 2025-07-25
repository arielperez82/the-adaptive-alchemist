import MarkdownIt from 'markdown-it'
import slug from 'slug'

export interface Heading {
  depth: number
  slug: string
  text: string
}

// Function to generate a slug from text
function generateSlug(text: string): string {
  return slug(text)
}

// Function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  // First decode HTML entities
  const decoded = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )

  // Then strip HTML tags
  return decoded.replace(/<[^>]*>/g, '')
}

export function extractHeadings(markdown: string): Heading[] {
  const md = new MarkdownIt()
  const tokens = md.parse(markdown, {})
  const headings: Heading[] = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'heading_open') {
      const depth = parseInt(token.tag.slice(1)) // Extract depth from h1, h2, etc.

      // Find the corresponding inline token (next token should be the text)
      const nextToken = tokens[i + 1]
      if (nextToken && nextToken.type === 'inline' && nextToken.content) {
        // Use renderInline to convert markdown to HTML, then strip HTML for clean text
        const htmlContent = md.renderInline(nextToken.content)
        const cleanText = stripHtml(htmlContent).trim()
        const slug = generateSlug(cleanText)

        headings.push({ depth, slug, text: cleanText })
      }
    }
  }

  return headings
}
