// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { Heading, InlineCode, Root, Text } from 'mdast'
import slug from 'slug'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface HeadingWithId extends Heading {
  id?: string
  data?: {
    hProperties?: Record<string, unknown>
  }
}

const generateSlug = (text: string): string => {
  return slug(text)
}

export const remarkHeadingLinks: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'heading', (node: HeadingWithId) => {
      if (!node.children || node.children.length === 0) return

      // Find the text content of the heading
      const textContent = node.children
        .map((child) => {
          if (child.type === 'text') return (child as Text).value
          if (child.type === 'inlineCode') return (child as InlineCode).value
          return ''
        })
        .join('')

      // Generate slug from text content
      const slug = generateSlug(textContent)

      // Add id to the heading
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.id = slug

      // Convert the heading to HTML with the link icon
      const headingLevel = node.depth
      const headingTag = `h${headingLevel}`

      // Create the link icon HTML
      const linkIcon = `
        <a 
          href="#${slug}" 
          class="heading-link-icon" 
          aria-label="Copy link to heading"
          onclick="copyHeadingLink('${slug}')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </a>
      `

      // Replace the heading with HTML that includes the icon
      const originalHeading = node as HeadingWithId & {
        type: string
        value: string
      }
      originalHeading.type = 'html'
      originalHeading.value = `<${headingTag} id="${slug}" class="heading-with-link">${linkIcon}${textContent}</${headingTag}>`
    })
  }
}
