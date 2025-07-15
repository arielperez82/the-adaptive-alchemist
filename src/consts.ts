// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Re-export from centralized config for backward compatibility
export { siteConfig } from '@/config/site'

// Legacy exports for backward compatibility
import { siteConfig } from '@/config/site'
export const SITE_TITLE = siteConfig.title
export const SITE_DESCRIPTION = siteConfig.description
