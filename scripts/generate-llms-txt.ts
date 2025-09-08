// scripts/generate-llms-txt.ts
// Post-build script to generate llms.txt and llms-full.txt from all HTML files in dist
import { execSync } from 'child_process'
import fs from 'fs/promises'
import { unescape } from 'html-escaper'
import path from 'path'
import TurndownService from 'turndown'
import { fileURLToPath } from 'url'

import { SITE_DESCRIPTION, SITE_TITLE } from '../src/consts.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, '../dist')
const llmsFile = path.join(distDir, 'llms.txt')
const llmsFullFile = path.join(distDir, 'llms-full.txt')
const blogJsonFile = path.join(distDir, 'blog.json')
const turndownService = new TurndownService()

type PageMeta = {
  title: string
  description: string
  url: string
  path: string
  section: string
  publishingDate?: string
  heroImageUrl?: string
  readingTime?: string
}

const getSiteURL = () => {
  return process.env.SITE_URL || 'https://www.adaptivealchemist.com'
}

function unescapeHtml(text: string): string {
  return unescape(text)
}

function getGitTimestamp(filePath: string): string {
  try {
    // Map dist file path back to source file path
    const relativePath = path.relative(distDir, filePath)
    const sourcePath = relativePath
      .replace(/\.html$/, '')
      .replace(/\/index$/, '')

    // Map to source files
    let sourceFile = ''
    if (sourcePath.startsWith('posts/')) {
      sourceFile = `src/content/blog/${sourcePath.replace('posts/', '')}.md`
    } else if (sourcePath === 'about') {
      sourceFile = 'src/pages/about.astro'
    } else if (sourcePath === '') {
      sourceFile = 'src/pages/index.astro'
    } else if (sourcePath.startsWith('tags/')) {
      sourceFile = `src/pages/tags/${sourcePath.replace('tags/', '')}.astro`
    }

    if (sourceFile) {
      const timestamp = execSync(
        `git log -1 --format="%cd" --date=iso -- "${sourceFile}"`,
        { encoding: 'utf-8' }
      ).trim()
      return timestamp
    }
    return new Date().toISOString()
  } catch {
    return new Date().toISOString()
  }
}

function extractMeta(html: string, filePath: string): PageMeta {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  const descMatch = html.match(
    /<meta name=["']description["'] content=["'](.*?)["']>/i
  )
  const ogTypeMatch = html.match(
    /<meta property=["']og:type["'] content=["'](.*?)["']>/i
  )

  // Extract publishing date from time tag
  const timeMatch = html.match(/<time[^>]*datetime=["']([^"']*)["'][^>]*>/i)
  const publishingDate = timeMatch ? timeMatch[1] : undefined

  const baseUrl = getSiteURL()

  // Extract hero image URL from HTML
  const heroImageMatch = html.match(
    /<img[^>]*src=["']([^"']*)["'][^>]*class=["'][^"']*hero-image[^"']*["'][^>]*>/i
  )
  const heroImageUrl = heroImageMatch
    ? `${baseUrl}${heroImageMatch[1]}`
    : undefined

  // Extract reading time from HTML
  const readingTimeMatch = html.match(
    /<span[^>]*class=["'][^"']*reading-time[^"']*["'][^>]*>([^<]*)<\/span>/i
  )
  const readingTime = readingTimeMatch ? readingTimeMatch[1].trim() : undefined

  // Extract path from file path
  const relativePath = path.relative(distDir, filePath)
  const urlPath = relativePath.replace(/\.html$/, '').replace(/index$/, '')

  const url = `${baseUrl}/${urlPath}`

  // Determine section based on path and og:type
  let section = 'Home'
  if (ogTypeMatch && ogTypeMatch[1] === 'article') {
    section = 'Posts'
  } else if (urlPath.startsWith('tags/')) {
    section = 'Topics'
  } else if (urlPath === 'about') {
    section = 'About'
  }

  return {
    title: titleMatch ? unescapeHtml(titleMatch[1]) : 'Untitled',
    description: descMatch ? unescapeHtml(descMatch[1]) : '',
    url,
    path: urlPath,
    section,
    publishingDate,
    heroImageUrl,
    readingTime
  }
}

async function* walkHtmlFiles(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walkHtmlFiles(fullPath)
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.html') &&
      entry.name !== '404.html' &&
      entry.name !== 'llms.txt' &&
      entry.name !== 'llms-full.txt' &&
      entry.name !== 'robots.txt' &&
      entry.name !== 'sitemap.xml' &&
      !fullPath.includes('/confirm/')
    ) {
      yield fullPath
    }
  }
}

async function convertHtmlToMarkdown(filePath: string): Promise<string> {
  const html = await fs.readFile(filePath, 'utf-8')

  return turndownService
    .addRule('ariaLabeledLink', {
      filter: (node) =>
        node.nodeName === 'A' && !!node.getAttribute('aria-label'),
      replacement: (_, node) => {
        const ariaLabel = (node as HTMLElement).getAttribute('aria-label')
        return `[${ariaLabel || ''}](${(node as HTMLElement).getAttribute('href') || ''})`
      }
    })
    .remove('script')
    .remove('style')
    .remove('header')
    .remove('footer')
    .remove('nav')
    .turndown(html)
}

async function processHtmlFileForFull(filePath: string): Promise<string> {
  const html = await fs.readFile(filePath, 'utf-8')
  const meta = extractMeta(html, filePath)
  const lastUpdate = getGitTimestamp(filePath)

  // Map dist file path back to source file path
  const relativePath = path.relative(distDir, filePath)
  const sourcePath = relativePath.replace(/\.html$/, '').replace(/\/index$/, '')

  let markdown = ''

  // Check if this is a blog post by looking for og:type="article"
  const ogTypeMatch = html.match(
    /<meta property=["']og:type["'] content=["'](.*?)["']/i
  )
  const isBlogPost = ogTypeMatch?.[1] === 'article'

  // For blog posts, use the original markdown content
  if (isBlogPost) {
    // Extract slug from URL path
    const postSlug = sourcePath
    const sourceFile = `src/content/blog/${postSlug}.md`

    try {
      const mdContent = await fs.readFile(sourceFile, 'utf-8')
      // Extract content after frontmatter
      const contentMatch = mdContent.match(
        /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
      )
      if (contentMatch) {
        markdown = contentMatch[2] // Content after frontmatter
      } else {
        markdown = mdContent // Fallback to full content if no frontmatter
      }
    } catch {
      // Fallback to HTML conversion if markdown file not found
      markdown = await convertHtmlToMarkdown(filePath)
    }
  } else {
    // For other files, continue with HTML to markdown conversion
    markdown = await convertHtmlToMarkdown(filePath)
  }

  return `---

Source: ${meta.url}
Publishing date: ${meta.publishingDate || lastUpdate}
Last update: ${lastUpdate}
Title: "${meta.title}"
Description: "${meta.description}"
---

# ${meta.title}

${markdown}

---

`
}

async function generateSitemap(pages: PageMeta[]): Promise<string> {
  let sitemap = `# ${SITE_TITLE}\n\n${SITE_DESCRIPTION}\n\n`

  // Group pages by section
  const sections = new Map<string, PageMeta[]>()
  pages.forEach((page) => {
    if (!sections.has(page.section)) {
      sections.set(page.section, [])
    }
    sections.get(page.section)!.push(page)
  })

  // Generate sections and pages
  for (const [section, sectionPages] of sections) {
    sitemap += `## ${section}\n\n`
    for (const page of sectionPages) {
      sitemap += `- [${page.title}](${page.url})\n`
    }
    sitemap += '\n'
  }

  return sitemap
}

async function generateBlogJson(pages: PageMeta[]): Promise<string> {
  // Filter to only blog posts
  const blogPosts = pages.filter((page) => page.section === 'Posts')

  // Sort by publishing date (newest first)
  blogPosts.sort((a, b) => {
    const dateA = a.publishingDate ? new Date(a.publishingDate) : new Date(0)
    const dateB = b.publishingDate ? new Date(b.publishingDate) : new Date(0)
    return dateB.getTime() - dateA.getTime()
  })

  // Map to JSON structure
  const blogJson = blogPosts.map((post) => ({
    title: post.title,
    description: post.description,
    publishingDate: post.publishingDate,
    readingTime: post.readingTime || 'Unknown',
    heroImageUrl: post.heroImageUrl,
    url: post.url
  }))

  return JSON.stringify(blogJson, null, 2)
}

async function main() {
  const pages: PageMeta[] = []
  const fullContent: string[] = []

  // Process all HTML files
  for await (const filePath of walkHtmlFiles(distDir)) {
    const html = await fs.readFile(filePath, 'utf-8')
    const meta = extractMeta(html, filePath)
    pages.push(meta)

    // Generate full content for llms-full.txt
    const fullPageContent = await processHtmlFileForFull(filePath)
    fullContent.push(fullPageContent)
  }

  // Generate llms.txt (sitemap format)
  const sitemap = await generateSitemap(pages)
  await fs.writeFile(llmsFile, sitemap, 'utf-8')
  console.log('llms.txt generated at', llmsFile)

  // Generate llms-full.txt (full content format)
  const fullContentText = fullContent.join('\n')
  await fs.writeFile(llmsFullFile, fullContentText, 'utf-8')
  console.log('llms-full.txt generated at', llmsFullFile)

  // Generate blog.json (blog content JSON)
  const blogJson = await generateBlogJson(pages)
  await fs.writeFile(blogJsonFile, blogJson, 'utf-8')
  console.log('blog.json generated at', blogJsonFile)
}

main().catch((err) => {
  console.error('Failed to generate llms files:', err)
  process.exit(1)
})
