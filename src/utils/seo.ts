// src/utils/seo.ts
// SEO utility functions for generating structured data and meta information

import { siteConfig } from '@/config/site'

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export function generateWebsiteStructuredData(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.favicon}`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateOrganizationStructuredData(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.title,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.favicon}`,
    sameAs: [
      `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
      `https://linkedin.com/in/${siteConfig.linkedinHandle}`
    ],
    description: siteConfig.description
  }
}

export function generateBlogPostStructuredData({
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
    image: heroImage ? new URL(heroImage, siteConfig.url).href : undefined,
    author: {
      '@type': 'Person',
      name: siteConfig.author
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.favicon}`
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

export function generateBreadcrumbStructuredData({
  items
}: {
  items: Array<{ name: string; url: string }>
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateArticleListStructuredData({
  articles,
  pageURL
}: {
  articles: Array<{
    title: string
    description: string
    url: string
    pubDate: Date
    author: string
  }>
  pageURL: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog Articles',
    description: 'Latest articles from The Adaptive Alchemist',
    url: pageURL,
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        author: {
          '@type': 'Person',
          name: article.author
        },
        datePublished: article.pubDate.toISOString(),
        url: article.url
      }
    }))
  }
}
