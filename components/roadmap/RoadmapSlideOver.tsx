'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { RoadmapItem } from '@/types/sanity'

const CATEGORY_COLORS: Record<string, string> = {
  Backend: '#3b82f6',
  'AI/ML': '#8b5cf6',
  DevOps: '#f59e0b',
  Frontend: '#ec4899',
  Tools: '#71717a',
}

interface RoadmapSlideOverProps {
  item: RoadmapItem | null
  onClose: () => void
}

export default function RoadmapSlideOver({ item, onClose }: RoadmapSlideOverProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  if (!item) return null

  const catColor = CATEGORY_COLORS[item.category] ?? '#888888'

  const statusStyle = {
    Learned: { label: 'Learned', color: '#22c55e', bg: '#22c55e1a' },
    Learning: { label: 'Learning Now', color: '#eab308', bg: '#eab3081a' },
    Planned: { label: 'Planned', color: '#888888', bg: '#88888818' },
  }[item.status]

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full w-80 bg-bg-elevated border-l border-border-subtle z-50 p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={item.topic}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors duration-200"
        >
          <X size={18} />
        </button>

        {/* Status badge */}
        <span
          className="inline-block text-xs font-mono px-2.5 py-1 rounded-full"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
        >
          {statusStyle.label}
        </span>

        {/* Topic */}
        <h2 className="text-xl font-bold text-text-primary mt-4 leading-snug">
          {item.topic}
        </h2>

        {/* Category */}
        <span
          className="inline-block text-xs font-mono px-2 py-0.5 rounded mt-2"
          style={{ backgroundColor: `${catColor}26`, color: catColor }}
        >
          {item.category}
        </span>

        {/* Resources */}
        {item.resources && item.resources.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-mono text-text-muted mb-3">Resources</p>
            <ul className="space-y-2">
              {item.resources.map((url, i) => (
                <li key={i}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-green text-sm hover:underline break-all"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related project */}
        {item.projectSlug && (
          <div className="mt-6">
            <Link
              href={`/projects/${item.projectSlug}`}
              className="text-accent-green text-sm hover:underline"
              onClick={onClose}
            >
              Related project →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
