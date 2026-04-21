'use client'

import { useState, useMemo } from 'react'
import type { SanityPost } from '@/types/sanity'
import BlogCard from './BlogCard'
import BlogFilter from './BlogFilter'

interface BlogClientProps {
  posts: SanityPost[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [selected, setSelected] = useState('All')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)))
    return ['All', ...unique]
  }, [posts])

  const filtered = useMemo(() => {
    if (selected === 'All') return posts
    return posts.filter((p) => p.category === selected)
  }, [posts, selected])

  return (
    <>
      <BlogFilter
        categories={categories}
        selected={selected}
        onChange={setSelected}
      />

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-text-muted font-mono text-sm">
            No posts yet in this category.
          </p>
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
