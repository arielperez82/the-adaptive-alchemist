import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import { isExcludedFromSitemap, siteConfig } from './src/config/site'
import { createSEOPlugin } from './src/plugins/seo-plugin'

const getBasePath = () => {
  return '/'
}

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  base: getBasePath(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude pages that shouldn't be in sitemap
        return !isExcludedFromSitemap(page)
      }
    }),
    createSEOPlugin()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
})
