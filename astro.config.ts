import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

import { remarkExternalLinks } from './src/utils/remark-external-links.ts'

const getSiteURL = () => {
  return 'https://blog.adaptivealchemist.com'
}

const getBasePath = () => {
  return '/'
}

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  base: getBasePath(),
  env: {
    schema: {
      PUBLIC_SUPABASE_URL: envField.string({
        context: 'client',
        access: 'public'
      }),
      PUBLIC_SUPABASE_ANON_KEY: envField.string({
        context: 'client',
        access: 'public'
      })
    }
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude 404, unsubscribe, and confirm pages from sitemap
        return !page.includes('/404') && !page.includes('/confirm')
      }
    })
  ],
  markdown: {
    remarkPlugins: [remarkExternalLinks]
  },
  vite: {
    plugins: [...tailwindcss()]
  }
})
