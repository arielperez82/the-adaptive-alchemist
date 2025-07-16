import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

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
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude 404, unsubscribe, and confirm pages from sitemap
        return (
          !page.includes('/404') &&
          !page.includes('/unsubscribe') &&
          !page.includes('/confirm')
        )
      }
    })
  ],
  vite: {
    plugins: [...tailwindcss()]
  }
})
