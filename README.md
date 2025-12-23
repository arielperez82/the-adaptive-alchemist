# ✨ The Adaptive Alchemist

A modern blog and newsletter platform built with Astro, featuring comprehensive analytics, secure subscription management, and automated email delivery.

## 🚀 Tech Stack

- **Frontend**: Astro.js with TypeScript and Tailwind CSS
- **Hosting**: GitHub Pages (static hosting)
- **Analytics**: Tinybird (real-time analytics and performance monitoring)
- **Database**: Supabase (user management and subscription handling)
- **Email**: Resend (newsletter delivery and confirmation emails)
- **Content**: Markdown/MDX with frontmatter

## ✨ Features

### Blog Platform

- 🚀 **Maximum Performance** - Built with Astro.js for lightning-fast static sites
- 🎨 **Minimalist Design** - Clean UI that focuses on content
- 🌓 **Light/Dark Mode** - Smooth theme switching
- 📱 **Responsive** - Perfect experience on all devices
- ⚡ **SPA Transitions** - Smooth page navigation with transition effects
- 📝 **Markdown & MDX** - Write posts with Markdown and extend with MDX
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- 📊 **Reading Analytics** - Reading time, views, and engagement metrics
- 🔖 **Categorization** - Tags and categories system
- 🔄 **RSS Feed** - Automatically generated RSS feed

### Newsletter System

- 📧 **Double Opt-in** - Secure subscription confirmation via email
- 🛡️ **Abuse Prevention** - IP and email rate limiting
- 🚫 **Disposable Email Detection** - Blocks burner email addresses
- 📊 **Subscription Analytics** - Track subscriber engagement and growth
- 🔄 **Unsubscribe Management** - Easy one-click unsubscribe
- 📱 **Mobile-Optimized Emails** - Responsive email templates

### Analytics & Performance

- 📈 **Real-time Analytics** - Track page views, user behavior, and sources
- ⚡ **Core Web Vitals** - Monitor LCP, FID, and CLS performance metrics
- 🌍 **Geographic Data** - Visitor location analytics
- 💻 **Device Analytics** - Browser and device breakdown
- 🔗 **Referrer Tracking** - Traffic source attribution
- 📊 **Custom KPIs** - Business-specific metrics and dashboards

## 🏗️ Architecture

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Pages  │    │    Tinybird     │    │    Supabase     │
│   (Static Host) │    │   (Analytics)   │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                      │
         │                       │                      │
         ▼                       ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Astro.js Application                         │
│       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│       │   Content   │  │  Analytics  │  │ Newsletter  │         │
│       │  (MDX/MD)   │  │   Plugin    │  │   Signup    │         │
│       └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Resend API    │    │  Tinybird API   │    │  Supabase API   │
│   (Emails)      │    │  (Analytics)    │    │  (Auth/Data)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Requirements

- Node.js 22+ and pnpm
- Supabase account (for database and authentication)
- Tinybird account (for analytics)
- Resend account (for email delivery)
- GitHub account (for hosting)

### Installation

```bash
# Clone repository
git clone https://github.com/arielperez82/the-adaptive-alchemist

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Tinybird
TINYBIRD_TOKEN=your_tinybird_token
TINYBIRD_URL=https://api.tinybird.co

# Resend
RESEND_API_KEY=your_resend_api_key

# Site Configuration
SITE_URL=https://yourdomain.com
```

### Database Setup

1. **Supabase Setup**:
   - Create a new Supabase project
   - Run the migrations in `supabase/migrations/`
   - Set up Row Level Security (RLS) policies

2. **Tinybird Setup**:
   - Create a new Tinybird workspace
   - Deploy the datasources and endpoints from `tinybird/`
   - Configure the analytics plugin

3. **Resend Setup**:
   - Create a Resend account
   - Verify your domain for sending emails
   - Configure the email templates

### Local Development

```bash
# Start development server
pnpm dev

# Open browser at http://localhost:4321
```

### Available Scripts

#### Development

- `pnpm dev` - Start development server
- `pnpm start` - Start dev server with file watching and type checking
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm astro` - Run Astro CLI commands

#### Type Checking & Validation

- `pnpm check:astro` - Check Astro types and configuration
- `pnpm check:tinybird` - Check Tinybird deployment configuration
- `pnpm check:supabase` - Validate Supabase Edge Functions (checks imports, types, and syntax)
- `pnpm check:supabase <function-name>` - Validate a specific function (e.g., `pnpm check:supabase send-newsletter`)
- `pnpm check` - Run all type checks (Astro + Tinybird + Supabase)

#### Linting & Formatting

- `pnpm lint` - Run all linting checks (format, code, styles, markdown)
- `pnpm lint:fix` - Fix all linting issues automatically
- `pnpm lint:format` - Check code formatting with Prettier
- `pnpm lint:format:fix` - Fix code formatting automatically
- `pnpm lint:format:src` - Check formatting for source files
- `pnpm lint:format:src:fix` - Fix formatting for source files
- `pnpm lint:format:supabase` - Check formatting for Supabase functions
- `pnpm lint:format:supabase:fix` - Fix formatting for Supabase functions
- `pnpm lint:format:css` - Check CSS formatting
- `pnpm lint:format:css:fix` - Fix CSS formatting
- `pnpm lint:code` - Run ESLint on all code
- `pnpm lint:code:fix` - Fix ESLint issues automatically
- `pnpm lint:code:src` - Run ESLint on source files
- `pnpm lint:code:src:fix` - Fix ESLint issues in source files
- `pnpm lint:code:supabase` - Run ESLint on Supabase functions
- `pnpm lint:code:supabase:fix` - Fix ESLint issues in Supabase functions
- `pnpm lint:styles` - Run Stylelint on CSS and Astro files
- `pnpm lint:styles:fix` - Fix Stylelint issues automatically
- `pnpm lint:md` - Check markdown files
- `pnpm lint:md:fix` - Fix markdown issues automatically

#### Tinybird Analytics

- `pnpm test:tinybird` - Run Tinybird tests
- `pnpm build:tinybird` - Build Tinybird resources

#### Newsletter & Content

- `pnpm send-newsletter` - Send newsletter to subscribers
- `npx tsx scripts/test-newsletter-html.ts <article-path>` - Preview newsletter HTML before sending
- `pnpm generate:llms-txt` - Generate LLMs text file for content analysis

#### Deployment

- `pnpm predeploy` - Build project before deployment
- `pnpm deploy` - Deploy to GitHub Pages

#### Git Hooks

- `pnpm prepare` - Set up Husky git hooks
- `pnpm pre-commit` - Run lint-staged before commits

## 🔍 Automated Validation & Quality Assurance

### Pre-commit Hooks

The project uses **Husky** and **lint-staged** to automatically run quality checks before each commit:

- **TypeScript Validation** - Ensures all TypeScript code is properly typed
- **ESLint Checks** - Enforces code style and catches potential errors
- **Prettier Formatting** - Automatically formats code to maintain consistency
- **Stylelint Validation** - Ensures CSS follows best practices
- **Markdown Linting** - Validates markdown files for proper formatting

### IDE Integration

Configure your IDE to leverage the project's quality tools:

#### VS Code Extensions

Install these recommended extensions for the best development experience:

- **ESLint** - Real-time linting feedback
- **Prettier** - Automatic code formatting
- **Stylelint** - CSS/SCSS linting
- **TypeScript** - Enhanced TypeScript support
- **Astro** - Astro language support

#### IDE Configuration

The project includes configuration files for consistent development:

- `eslint.config.js` - ESLint rules and configuration
- `.prettierrc.mjs` - Prettier formatting rules
- `stylelint.config.mjs` - Stylelint configuration
- `tsconfig.json` - TypeScript compiler options
- `lint-staged.config.js` - Pre-commit hook configuration for staged files

### Continuous Quality Checks

- **Type Checking** - Astro and Tinybird configurations are validated
- **Build Validation** - Ensures the project builds successfully
- **Deployment Checks** - Validates deployment configuration before release

## 📁 Project Structure

```text
/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media
│   ├── components/           # Reusable UI components
│   ├── content/              # Blog content (MDX/MD)
│   ├── layouts/              # Page layouts
│   ├── pages/                # Astro pages and routes
│   ├── scripts/              # Analytics and utilities
│   ├── styles/               # Global styles
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── supabase/                 # Database and Edge Functions
│   ├── functions/            # Supabase Edge Functions
│   │   ├── subscribe/        # Newsletter subscription
│   │   ├── confirm-subscription/
│   │   ├── send-newsletter/
│   │   └── unsubscribe/
│   └── migrations/           # Database migrations
├── tinybird/                 # Analytics configuration
│   ├── datasources/          # Data ingestion
│   ├── endpoints/            # API endpoints
│   ├── materializations/     # Data aggregations
│   └── web_vitals/           # Performance monitoring
├── scripts/                  # Build and utility scripts
└── [config files]            # Various configuration files
```

## 📝 Writing Posts

To create a new blog post:

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add your content preceded by the following frontmatter:

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

## 📧 Newsletter Management

### Subscription Flow

1. User submits email via newsletter signup form
2. System validates email and checks for disposable addresses
3. Rate limiting prevents abuse (IP and email-based)
4. Confirmation email sent via Resend
5. User clicks confirmation link to activate subscription
6. Subscription status tracked in Supabase

### Sending Newsletters

1. Create newsletter content in Markdown
2. Use the newsletter sending script to deliver to subscribers
3. Track delivery and engagement metrics
4. Handle bounces and unsubscribes automatically

### Previewing Newsletter HTML

Before sending a newsletter, you can preview the generated HTML to ensure it renders correctly:

```bash
# Generate newsletter HTML preview
npx tsx scripts/test-newsletter-html.ts src/content/blog/your-article.md
```

This script:

- Parses the article's frontmatter (title, description, publish date, etc.)
- Strips HTML comments and tags from markdown content (preserving markdown autolinks)
- Converts markdown to email-safe HTML using markdown-it
- Generates a complete newsletter HTML file with proper styling
- Saves the output to `newsletter-output.html` for preview in a browser

The script uses shared utilities from `supabase/functions/send-newsletter/utils.ts`, ensuring the preview matches exactly what will be sent to subscribers. This helps catch formatting issues, verify HTML escaping (especially for apostrophes and special characters), and ensure images and HTML tags are properly removed before sending.

## 📊 Analytics

The platform includes comprehensive analytics:

- **Page Views**: Track visitor engagement
- **User Behavior**: Monitor time on page, scroll depth
- **Traffic Sources**: Attribution and referrer tracking
- **Performance**: Core Web Vitals monitoring
- **Geographic Data**: Visitor location insights
- **Device Analytics**: Browser and device breakdown

## 🔧 CI/CD & Deployment

The project uses GitHub Actions for comprehensive CI/CD automation with multiple specialized workflows.

### Automated Workflows

#### 🚀 Site Deployment (`deploy-site.yml`)

- **Trigger**: Push to `main` branch with changes to source files
- **Process**:
  - Builds the Astro site with production optimizations
  - Deploys to GitHub Pages automatically
  - Creates deployment tags for tracking
- **Environment**: Uses GitHub Pages environment with secure secrets

#### 📊 Analytics Deployment (`deploy-tinybird.yml`)

- **Trigger**: Push to `main` with Tinybird changes or manual dispatch
- **Process**:
  - Validates Tinybird configurations and runs tests
  - Deploys to staging environment
  - Supports promotion to production
  - Creates deployment tags for version tracking
- **Features**: Multi-stage deployment with validation and rollback capabilities

#### 🔧 Backend Deployment (`deploy-supabase-edge-functions.yml`)

- **Trigger**: Push to `main` with Supabase function changes or manual dispatch
- **Process**:
  - Deploys individual Edge Functions based on changes
  - Supports selective function deployment
  - Creates function-specific deployment tags
- **Functions**: subscribe, confirm-subscription, send-newsletter, unsubscribe

#### 📧 Newsletter Automation (`send-newsletter.yml`)

- **Trigger**: Push to `main` with new blog posts or manual dispatch
- **Process**:
  - Automatically detects new blog posts
  - Prevents duplicate newsletter sends
  - Supports manual newsletter sending for specific articles
  - Creates tracking tags for sent newsletters

#### 🗄️ Database Migrations (`deploy-supabase-migrations.yml`)

- **Trigger**: Push to `main` with migration changes
- **Process**: Automatically applies database schema changes

### Deployment Environments

#### GitHub Pages (Production)

- **URL**: `https://yourdomain.com`
- **Build**: Static site generation with Astro
- **CDN**: Global content delivery network
- **SSL**: Automatic HTTPS enforcement

#### Supabase (Backend)

- **Database**: PostgreSQL with real-time subscriptions
- **Edge Functions**: Serverless functions for newsletter management
- **Authentication**: Built-in user management
- **Storage**: File and media storage

#### Tinybird (Analytics)

- **Real-time Analytics**: Page views, user behavior, performance metrics
- **Data Processing**: Real-time data ingestion and aggregation
- **API Endpoints**: RESTful APIs for analytics data

### Environment Variables

The following secrets and variables must be configured in GitHub:

#### Repository Secrets

- `SUPABASE_ACCESS_TOKEN` - Supabase CLI access token
- `TINYBIRD_TOKEN` - Tinybird API token
- `RESEND_API_KEY` - Resend email service API key

#### Repository Variables

- `SITE_URL` - Production site URL
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_PROJECT_ID` - Supabase project ID
- `TINYBIRD_HOST` - Tinybird API host
- `TINYBIRD_TRACKER_TOKEN` - Analytics tracking token

### Deployment Strategy

1. **Automatic Triggers**: Code changes automatically trigger appropriate deployments
2. **Path-based Deployment**: Only relevant services deploy when their files change
3. **Staged Rollouts**: Analytics and backend changes go through staging first
4. **Rollback Capability**: Deployment tags enable quick rollbacks
5. **Manual Override**: All workflows support manual triggering with custom parameters

### Monitoring & Tracking

- **Deployment Tags**: Each deployment creates git tags for tracking
- **Build Artifacts**: Site builds are preserved as artifacts
- **Deployment History**: GitHub Actions provides detailed deployment logs
- **Health Checks**: Automated validation ensures deployments succeed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
