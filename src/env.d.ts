/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/content" />

interface ImportMetaEnv {
  readonly SITE_URL: string
  readonly SUPABASE_URL: string
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
