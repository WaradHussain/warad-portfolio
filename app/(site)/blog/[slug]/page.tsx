import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import {
  sanityClient,
  sanityFetch,
  postBySlugQuery,
  relatedPostsQuery,
} from '@/lib/sanity'
import type { SanityPostFull, SanityPost } from '@/types/sanity'
import BlogCard from '@/components/blog/BlogCard'
import ShareButtons from '@/components/blog/ShareButtons'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getReadTime(excerpt: string): string {
  const words = excerpt.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${Math.max(1, minutes)} min read`
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

// ── Portable Text components ──────────────────────────────────────────────────

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-text-primary mt-12 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-text-secondary leading-[1.8] mb-5 text-base">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-green pl-5 my-6 text-text-secondary italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-5 text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-text-secondary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="bg-bg-elevated text-accent-green px-1.5 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-accent-green hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    code: ({ value }) => (
      <pre className="bg-bg-elevated border border-border-subtle rounded-xl p-5 overflow-x-auto my-6">
        <code className="font-mono text-sm text-text-primary">{value?.code}</code>
      </pre>
    ),
    image: ({ value }) => {
      if (!value?.asset?.url) return null
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ''}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )
    },
  },
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "post"]{"slug": slug.current}`
    )
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await sanityClient.fetch<SanityPostFull>(postBySlugQuery, { slug })
    if (!post) return {}
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch {
    return {}
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post: SanityPostFull | null = null
  let related: SanityPost[] = []

  try {
    post = await sanityFetch<SanityPostFull>(postBySlugQuery, { slug })
  } catch (error) {
    console.error('Failed to fetch post:', error)
  }

  if (!post) notFound()

  try {
    related = await sanityFetch<SanityPost[]>(relatedPostsQuery, {
      category: post.category,
      slug,
    })
  } catch {
    related = []
  }

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-6 py-12">

      {/* 1. Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-text-muted hover:text-accent-green font-mono text-sm transition-colors duration-200"
      >
        ← Blog
      </Link>

      {/* 2. Header */}
      <div className="mt-6">
        <span className="text-xs font-mono border border-border-subtle rounded px-2 py-0.5 text-text-muted">
          {post.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mt-3 font-mono text-sm text-text-secondary">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-text-muted">·</span>
          <span>{getReadTime(post.excerpt)}</span>
          <span className="text-text-muted">·</span>
          <span>by Warad Hussain</span>
        </div>
      </div>

      {/* 3. Cover image */}
      {post.coverImage && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-8">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {/* 4. Divider */}
      <hr className="border-border-subtle my-8" />

      {/* 5. Body */}
      <article className="prose-none">
        <PortableText value={post.body} components={portableComponents} />
      </article>

      {/* 6. Share */}
      <div className="mt-12 pt-8 border-t border-border-subtle">
        <p className="text-sm font-mono text-text-muted mb-4">Share this post</p>
        <ShareButtons title={post.title} slug={post.slug} />
      </div>

      {/* 7. Related posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <p className="text-sm font-mono text-text-muted mb-6">Related posts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
