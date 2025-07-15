import react from '@astrojs/react'
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
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
})
