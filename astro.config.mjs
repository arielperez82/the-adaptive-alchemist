import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// Determine site URL based on environment
const getSiteURL = () => {
  return 'https://arielperez82.github.io'
}

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  base: '/',
  integrations: [tailwind(), react()]
})
