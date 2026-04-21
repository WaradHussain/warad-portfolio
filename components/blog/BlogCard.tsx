import Link from 'next/link'
import Image from 'next/image'
import type { SanityPost } from '@/types/sanity'

function getReadTime(excerpt: string): string {
  const words = excerpt.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${Math.max(1, minutes)} min read`
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

interface BlogCardProps {
  post: SanityPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-bg-glass border border-border-glass rounded-xl overflow-hidden hover:border-accent-green/20 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Cover image */}
      {post.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-36 w-full bg-gradient-to-br from-bg-elevated to-bg-primary" />
      )}

      {/* Body */}
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono border border-border-subtle rounded px-2 py-0.5 text-text-muted">
            {post.category}
          </span>
          <span className="font-mono text-xs text-text-muted">
            {getReadTime(post.excerpt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-text-primary mt-2 line-clamp-2 leading-snug group-hover:text-accent-green transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-secondary mt-2 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-xs text-text-muted">
            {formatDate(post.publishedAt)}
          </span>
          <span className="text-accent-green text-sm transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
