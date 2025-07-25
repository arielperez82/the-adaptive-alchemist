import MarkdownIt from 'markdown-it'

export interface Heading {
  depth: number
  slug: string
  text: string
}

// Function to generate a slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
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
