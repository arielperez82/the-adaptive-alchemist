// Test script to generate newsletter HTML preview
import { readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

import {
  generateNewsletterHTML,
  stripHtmlFromMarkdown
} from '../supabase/functions/send-newsletter/utils.ts'

async function generateTestNewsletterHtml(articlePath: string): Promise<void> {
  try {
    const fileContent = readFileSync(articlePath, 'utf-8')
    const slug = articlePath.split('/').pop()?.replace('.md', '') || ''

    const { data, content } = matter(fileContent)

    if (!data.title || !data.description) {
      throw new Error(
        'Missing required frontmatter fields: title or description'
      )
    }

    const articleTitle = data.title
    const articleDescription = data.description
    const articleMarkdown = content
    const articleUrl = `https://www.adaptivealchemist.com/blog/${slug}`
    const articleAuthor = data.author
    const articlePublishDate = data.pubDate

    // Initialize markdown-it with email-safe options
    // Disable HTML block rule to prevent HTML comments from being processed
    const md = new MarkdownIt({
      html: false,
      linkify: true,
      typographer: true
    }).disable(['html_block'])

    // Strip HTML from markdown
    const cleanedArticleMarkdown = stripHtmlFromMarkdown(articleMarkdown)

    // Convert markdown to email-safe HTML
    const articleHtml = md.render(cleanedArticleMarkdown)

    // Generate newsletter HTML
    const newsletterHtml = generateNewsletterHTML(
      articleTitle,
      articleDescription,
      articleUrl,
      articleHtml,
      articleAuthor,
      articlePublishDate
    )

    // Output to file
    const outputPath = 'newsletter-output.html'
    writeFileSync(outputPath, newsletterHtml)
    console.log(`✅ Newsletter HTML generated and saved to ${outputPath}`)
    console.log(`📄 Article: ${articleTitle}`)
    console.log(`🔗 URL: ${articleUrl}`)
  } catch (error) {
    console.error('❌ Failed to generate newsletter HTML:', error)
    process.exit(1)
  }
}

const articlePath = process.argv[2]

if (!articlePath) {
  console.error('Usage: tsx scripts/test-newsletter-html.ts <article-path>')
  console.error(
    'Example: tsx scripts/test-newsletter-html.ts src/content/blog/my-article.md'
  )
  process.exit(1)
}

generateTestNewsletterHtml(articlePath)
