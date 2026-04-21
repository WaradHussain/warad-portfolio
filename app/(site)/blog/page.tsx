import type { Metadata } from 'next'
import { sanityFetch, allPostsQuery } from '@/lib/sanity'
import type { SanityPost } from '@/types/sanity'
import BlogClient from '@/components/blog/BlogClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing on Python, AI, and backend engineering.',
}

export default async function BlogPage() {
  let posts: SanityPost[] = []

  try {
    posts = await sanityFetch<SanityPost[]>(allPostsQuery, {}, 3600)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent-green font-mono text-sm">02.</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight font-mono">
          Blog
        </h1>
        <p className="text-text-secondary mt-2 text-base">
          Technical writing on Python, AI, and engineering craft.
        </p>
      </div>

      <BlogClient posts={posts} />
    </main>
  )
}
