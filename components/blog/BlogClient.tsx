'use client'

import { useState, useMemo } from 'react'
import type { SanityPost } from '@/types/sanity'
import BlogCard from './BlogCard'
import BlogFilter from './BlogFilter'
import { Search, X } from 'lucide-react'

interface BlogClientProps {
  posts: SanityPost[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [selected, setSelected] = useState('All')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)))
    return ['All', ...unique]
  }, [posts])

  const filtered = useMemo(() => {
    let result = selected === 'All' ? posts : posts.filter((p) => p.category === selected)

    // Search filters on title + excerpt — case insensitive
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q)
      )
    }

    return result
  }, [posts, selected, query])

  return (
    <>
      {/* ── Search bar ──────────────────────────────────────────────────── */}
      <div className="relative mb-6">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search blog posts"
          className="w-full bg-bg-glass border border-border-glass rounded-lg pl-9 pr-9 py-2.5 text-sm text-text-primary placeholder:text-text-muted font-mono focus:outline-none focus:border-accent-green/40 focus:bg-white/[0.06] transition-all duration-200"
        />
        {/* Clear button — only visible when there's a query */}
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Category filter ─────────────────────────────────────────────── */}
      <BlogFilter
        categories={categories}
        selected={selected}
        onChange={(cat) => setSelected(cat)}
      />

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <p className="text-text-muted font-mono text-sm">
            {query
              ? `No posts found for "${query}"`
              : 'No posts yet in this category.'}
          </p>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-accent-green font-mono text-xs hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
