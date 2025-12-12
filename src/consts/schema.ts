// src/consts/schema.ts
import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'

const siteUrl = 'https://www.adaptivealchemist.com'
const authorUrl = 'https://www.arielperez.io'

// Minimal Person schema that references arielperez.io as canonical source
// No need for sameAs here - the relationship is established via @id and url
export const defaultPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${authorUrl}/#person`,
  name: 'Ariel Pérez',
  alternateName: 'Ariel Perez',
  url: authorUrl
}

export const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${authorUrl}/#person`,
      name: 'Ariel Pérez',
      alternateName: 'Ariel Perez',
      url: authorUrl
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      publisher: {
        '@id': `${authorUrl}/#person`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/?s={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ]
}
