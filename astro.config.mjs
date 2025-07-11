import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { process } from 'process'

const getSiteURL = () => {
  return process.env.SITE_URL ?? 'https://blog.adaptivealchemist.com'
}

const getBasePath = () => {
  return process.env.BASE_PATH ?? '/'
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
