// src/plugins/seo-plugin.ts
// Comprehensive SEO plugin for Astro projects

import type { AstroIntegration } from 'astro'

export interface SEOPluginOptions {
  siteURL: string
  defaultTitle?: string
  defaultDescription?: string
  defaultImage?: string
  twitterHandle?: string
  facebookAppId?: string
  googleAnalyticsId?: string
  excludeFromSitemap?: string[]
  excludeFromRobots?: string[]
}

export interface MetaTag {
  name?: string
  property?: string
  content: string
  key?: string
}

export interface OpenGraphData {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  type?: 'article' | 'website'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  locale?: string
}

export interface TwitterCardData {
  card?: 'summary_large_image' | 'summary'
  site?: string
  creator?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
}

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export class SEOPlugin {
  private options: Required<SEOPluginOptions>

  constructor(options: SEOPluginOptions) {
    this.options = {
      siteURL: options.siteURL,
      defaultTitle: options.defaultTitle || 'The Adaptive Alchemist',
      defaultDescription:
        options.defaultDescription ||
        'Real-world insights on adaptive leadership, fluid organizations, and technological enablement.',
      defaultImage: options.defaultImage || '/og-image.jpg',
      twitterHandle: options.twitterHandle || '@adaptivealchemist',
      facebookAppId: options.facebookAppId || '',
      googleAnalyticsId: options.googleAnalyticsId || '',
      excludeFromSitemap: options.excludeFromSitemap || [
        '/confirm',
        '/unsubscribe',
        '/404'
      ],
      excludeFromRobots: options.excludeFromRobots || [
        '/confirm',
        '/unsubscribe',
        '/404'
      ]
    }
  }

  // Generate basic meta tags
  generateBasicMetaTags(title: string, description?: string): MetaTag[] {
    return [
      { name: 'title', content: title },
      {
        name: 'description',
        content: description || this.options.defaultDescription
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'The Adaptive Alchemist' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#18181b' },
      { name: 'msapplication-TileColor', content: '#18181b' }
    ]
  }

  // Generate Open Graph meta tags
  generateOpenGraphTags(data: OpenGraphData, canonicalURL: string): MetaTag[] {
    const ogTitle = data.title || this.options.defaultTitle
    const ogDescription = data.description || this.options.defaultDescription
    const ogImage = data.image
      ? new URL(data.image, this.options.siteURL).href
      : new URL(this.options.defaultImage, this.options.siteURL).href

    return [
      { property: 'og:site_name', content: this.options.defaultTitle },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { property: 'og:url', content: canonicalURL },
      { property: 'og:type', content: data.type || 'website' },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:alt', content: data.imageAlt || ogTitle },
      { property: 'og:locale', content: data.locale || 'en_US' },
      ...(data.type === 'article'
        ? [
            ...(data.publishedTime
              ? [
                  {
                    property: 'article:published_time',
                    content: data.publishedTime
                  }
                ]
              : []),
            ...(data.modifiedTime
              ? [
                  {
                    property: 'article:modified_time',
                    content: data.modifiedTime
                  }
                ]
              : []),
            ...(data.author
              ? [{ property: 'article:author', content: data.author }]
              : []),
            ...(data.tags
              ? data.tags.map((tag) => ({
                  property: 'article:tag',
                  content: tag
                }))
              : [])
          ]
        : [])
    ]
  }

  // Generate Twitter Card meta tags
  generateTwitterCardTags(data: TwitterCardData): MetaTag[] {
    const card = data.card || 'summary_large_image'
    const site = data.site || this.options.twitterHandle
    const creator = data.creator || this.options.twitterHandle

    return [
      { name: 'twitter:card', content: card },
      { name: 'twitter:site', content: site },
      { name: 'twitter:creator', content: creator },
      {
        name: 'twitter:title',
        content: data.title || this.options.defaultTitle
      },
      {
        name: 'twitter:description',
        content: data.description || this.options.defaultDescription
      },
      ...(data.image
        ? [
            {
              name: 'twitter:image',
              content: new URL(data.image, this.options.siteURL).href
            },
            {
              name: 'twitter:image:alt',
              content: data.imageAlt || data.title || this.options.defaultTitle
            }
          ]
        : [])
    ]
  }

  // Generate structured data for website
  generateWebsiteStructuredData(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.options.defaultTitle,
      description: this.options.defaultDescription,
      url: this.options.siteURL,
      publisher: {
        '@type': 'Organization',
        name: this.options.defaultTitle,
        logo: {
          '@type': 'ImageObject',
          url: new URL('/favicon.svg', this.options.siteURL).href
        }
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.options.siteURL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  }

  // Generate structured data for organization
  generateOrganizationStructuredData(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.options.defaultTitle,
      url: this.options.siteURL,
      logo: new URL('/favicon.svg', this.options.siteURL).href,
      sameAs: [
        `https://twitter.com/${this.options.twitterHandle.replace('@', '')}`,
        'https://linkedin.com/in/adaptivealchemist'
      ],
      description: this.options.defaultDescription
    }
  }

  // Generate structured data for blog post
  generateBlogPostStructuredData({
    title,
    description,
    pubDate,
    updatedDate,
    heroImage,
    readingTime,
    tags,
    canonicalURL
  }: {
    title: string
    description: string
    pubDate: Date
    updatedDate?: Date
    heroImage?: string
    readingTime?: string
    tags?: string[]
    canonicalURL: string
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      image: heroImage
        ? new URL(heroImage, this.options.siteURL).href
        : undefined,
      author: {
        '@type': 'Person',
        name: 'The Adaptive Alchemist'
      },
      publisher: {
        '@type': 'Organization',
        name: this.options.defaultTitle,
        logo: {
          '@type': 'ImageObject',
          url: new URL('/favicon.svg', this.options.siteURL).href
        }
      },
      datePublished: pubDate.toISOString(),
      dateModified: updatedDate
        ? updatedDate.toISOString()
        : pubDate.toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalURL
      },
      keywords: tags?.join(', ') || '',
      articleSection: 'Blog',
      wordCount: readingTime
    }
  }

  // Generate robots.txt content
  generateRobotsTxt(): string {
    const disallowRules = this.options.excludeFromRobots
      .map((path) => `Disallow: ${path}`)
      .join('\n')

    return `User-agent: *
Allow: /

# Disallow specific pages that shouldn't be crawled
${disallowRules}

# Sitemap location
Sitemap: ${this.options.siteURL}/sitemap-index.xml`
  }

  // Check if page should be excluded from sitemap
  shouldExcludeFromSitemap(pathname: string): boolean {
    return this.options.excludeFromSitemap.some((excluded) =>
      pathname.startsWith(excluded)
    )
  }

  // Check if page should be excluded from robots
  shouldExcludeFromRobots(pathname: string): boolean {
    return this.options.excludeFromRobots.some((excluded) =>
      pathname.startsWith(excluded)
    )
  }

  // Generate canonical URL
  generateCanonicalURL(pathname: string): string {
    return new URL(pathname, this.options.siteURL).href
  }
}

// Astro integration
export function createSEOPlugin(): AstroIntegration {
  return {
    name: 'astro-seo-plugin',
    hooks: {
      'astro:config:setup': ({ config }) => {
        // Add sitemap integration if not already present
        if (
          !config.integrations?.some(
            (integration) => integration.name === '@astrojs/sitemap'
          )
        ) {
          console.warn(
            'SEO Plugin: Consider adding @astrojs/sitemap integration for better SEO'
          )
        }
      }
    }
  }
}

// Export default plugin instance - simplified for Astro config compatibility
export const seoPlugin = new SEOPlugin({
  siteURL: 'https://blog.adaptivealchemist.com',
  defaultTitle: 'The Adaptive Alchemist',
  defaultDescription:
    "Real-world insights on adaptive leadership, fluid organizations, and technological enablement from someone who's built, scaled, and fixed things in the trenches.",
  excludeFromSitemap: ['/confirm', '/unsubscribe', '/404'],
  excludeFromRobots: ['/confirm', '/unsubscribe', '/404']
})
