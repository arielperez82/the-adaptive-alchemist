// src/config/site.ts
// Centralized site configuration

export interface SiteConfig {
  url: string
  title: string
  description: string
  author: string
  twitterHandle: string
  linkedinHandle: string
  githubHandle: string
  email: string
  defaultImage: string
  favicon: string
  excludeFromSitemap: string[]
  excludeFromRobots: string[]
}

// Get environment variables with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  return import.meta.env[key] || fallback
}

// Site configuration
export const siteConfig: SiteConfig = {
  url: getEnvVar('SITE_URL', 'https://blog.adaptivealchemist.com'),
  title: 'The Adaptive Alchemist',
  description:
    "Real-world insights on adaptive leadership, fluid organizations, and technological enablement from someone who's built, scaled, and fixed things in the trenches.",
  author: 'The Adaptive Alchemist',
  twitterHandle: '@adaptivealchemist',
  linkedinHandle: 'adaptivealchemist',
  githubHandle: 'adaptivealchemist',
  email: 'hello@adaptivealchemist.com',
  defaultImage: '/og-image.jpg',
  favicon: '/the-adaptive-alchemist-logo-transparent.svg',
  excludeFromSitemap: ['/confirm', '/unsubscribe', '/404'],
  excludeFromRobots: ['/confirm', '/unsubscribe', '/404']
}

// Helper functions
export const getCanonicalURL = (pathname: string): string => {
  return new URL(pathname, siteConfig.url).href
}

export const getImageURL = (imagePath: string): string => {
  return new URL(imagePath, siteConfig.url).href
}

export const isExcludedFromSitemap = (pathname: string): boolean => {
  return siteConfig.excludeFromSitemap.some((excluded) =>
    pathname.includes(excluded)
  )
}

export const isExcludedFromRobots = (pathname: string): boolean => {
  return siteConfig.excludeFromRobots.some((excluded) =>
    pathname.includes(excluded)
  )
}
