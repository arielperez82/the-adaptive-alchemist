# ✨ The Adaptive Alchemist

## Features

- 🚀 **Maximum Performance** - Built with Astro.js for lightning-fast static sites
- 🎨 **Minimalist Design** - Clean UI that focuses on content
- 🌓 **Light/Dark Mode** - Smooth theme switching
- 📱 **Responsive** - Perfect experience on all devices
- ⚡ **SPA Transitions** - Smooth page navigation with transition effects
- 📝 **Markdown & MDX** - Write posts with Markdown and extend with MDX
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- 📊 **Analytics** - Reading time, views, and statistics
- 🔖 **Categorization** - Tags and categories system
- 🔄 **RSS Feed** - Automatically generated RSS feed
- 🎵 **Spotify Integration** - Display currently playing track
- 🌐 **Internationalization Ready** - Prepared for multiple languages
- 🔒 **Secure** - No unnecessary client-side JavaScript

## Getting Started

### Requirements

- Node.js 22+ and pnpm
- Spotify account (optional, for Now Playing feature)

### Installation

```bash
# Clone repository
git clone https://github.com/arielperez82/the-adaptive-alchemist

# Install dependencies
pnpm install

# Create .env file from template
cp .env.example .env

# Edit .env with your information
```

### Development

```bash
# Start development server
pnpm dev

# Open browser at http://localhost:4321
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm start` - Alias for dev server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm astro` - Run Astro CLI commands

## Project Structure

```text
/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images to be optimized
│   ├── components/       # Reusable UI components
│   ├── content/          # Blog content
│   │   └── blog/         # Blog posts in Markdown/MDX
│   ├── layouts/          # Page layouts
│   ├── pages/            # Pages and routes
│   ├── styles/           # CSS and Tailwind
│   └── utils/            # Utilities and helpers
├── scripts/              # Build and utility scripts
├── astro.config.mjs      # Astro configuration
├── eslint.config.js      # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration
├── stylelint.config.mjs  # Astro configuration
├── tailwind.config.cjs   # Tailwind configuration
└── tsconfig.json         # Typescript configuration
```

## Writing Posts

To create a new blog post:

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add the following frontmatter at the top of your file:

```md
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: YYYY-MM-DD
heroImage: '/path/to/hero-image.jpg'
readingTime: 'X min read'
tags: ['tag1', 'tag2', 'tag3']
---

Your post content here...
```

<!-- markdownlint-disable ol-prefix -->

3. Write your content using Markdown syntax
