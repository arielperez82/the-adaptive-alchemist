export default {
    "*.md": [
      "pnpm run lint:format:fix '*.md'",
      "pnpm run lint:md:fix"
    ],
    "{src,scripts}/**/*.{js,jsx,ts,tsx,astro}": () => [
      "pnpm run lint:format:src:fix",
      "pnpm run lint:code:src:fix"
    ],
    "src/**/*.{js,jsx,ts,tsx,astro}":  () => [
      "pnpm run check:astro"
    ],
    "supabase/functions/**/*.{ts,tsx}": () =>[
      "pnpm run lint:format:supabase:fix",
      "pnpm run lint:code:supabase:fix",
      "pnpm run check:supabase"
    ],
    "*.{css,astro}":  () => [
      "pnpm run lint:format:css:fix",
      "pnpm run lint:styles:fix"
    ],
    "tinybird/**/*.{pipe,datasource,njjson,json,sql,yaml}":  () => [
      "pnpm run test:tinybird"
    ],
    "tinybird/**/*.{pipe,datasource}": () => [
      "pnpm run check:tinybird"
    ]
  }