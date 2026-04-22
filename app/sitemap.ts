import { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://waradhussain.com'
  const now = new Date()

  const staticRoutes = [
    { url: base,                        priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${base}/projects`,          priority: 0.9, changeFrequency: 'weekly'  as const },
    { url: `${base}/blog`,              priority: 0.9, changeFrequency: 'weekly'  as const },
    { url: `${base}/certificates`,      priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/roadmap`,           priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/contact`,           priority: 0.5, changeFrequency: 'yearly'  as const },
  ].map(r => ({ ...r, lastModified: now }))

  const [posts, projects] = await Promise.all([
    sanityClient.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type=="post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
    ),
    sanityClient.fetch<{ slug: string }[]>(
      `*[_type=="project" && defined(slug.current)]{ "slug": slug.current }`
    ),
  ])

  const postRoutes = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectRoutes = projects.map(p => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes, ...projectRoutes]
}
