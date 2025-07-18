import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'

// Change back to uppercase GET to match what Astro is expecting in newer versions
export async function GET(context: APIContext) {
  const posts = await getCollection('blog')

  // Sort posts by date in descending order
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  )

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site?.toString() || import.meta.env.SITE,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.slug}/`,
      // Optional: include categories/tags as array
      categories: post.data.tags || []
    }))
  })
}
