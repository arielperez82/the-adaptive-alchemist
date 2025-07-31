// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { visit } from 'unist-util-visit'

export function remarkExternalLinks(options: { siteUrl?: string } = {}) {
  const { siteUrl = 'https://www.adaptivealchemist.com' } = options
  const siteHostname = new globalThis.URL(siteUrl).hostname

  return function (tree) {
    visit(tree, 'link', (node) => {
      if (!node.url) return

      try {
        const url = new globalThis.URL(node.url, siteUrl)
        const isExternal = url.hostname !== siteHostname && url.hostname !== ''

        if (isExternal) {
          // Add target="_blank" and rel="noopener noreferrer"
          if (!node.data) node.data = {}
          if (!node.data.hProperties) node.data.hProperties = {}

          const hProperties = node.data.hProperties
          hProperties.target = '_blank'
          hProperties.rel = 'noopener noreferrer'
          hProperties.class = 'external-link'

          // Add aria-label for accessibility
          const linkText = node.children?.[0]?.value || node.url
          hProperties['aria-label'] = `${linkText} (opens in new tab)`
        }
      } catch {
        // Skip invalid URLs silently
      }
    })
  }
}
