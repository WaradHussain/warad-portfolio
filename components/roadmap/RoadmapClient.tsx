'use client'

import { useState, useMemo } from 'react'
import type { RoadmapItem } from '@/types/sanity'
import RoadmapCard from './RoadmapCard'
import RoadmapSlideOver from './RoadmapSlideOver'

const CATEGORIES = ['All', 'Backend', 'AI/ML', 'DevOps', 'Frontend', 'Tools'] as const

interface RoadmapClientProps {
  items: RoadmapItem[]
}

type Status = 'Learned' | 'Learning' | 'Planned'

const COLUMNS: { status: Status; label: string; icon: React.ReactNode }[] = [
  {
    status: 'Learned',
    label: 'Learned',
    icon: <span className="text-green-500 text-sm">✓</span>,
  },
  {
    status: 'Learning',
    label: 'Learning Now',
    icon: <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse inline-block" />,
  },
  {
    status: 'Planned',
    label: 'Planned',
    icon: <span className="text-text-muted text-sm">○</span>,
  },
]

const STATUS_COLORS: Record<Status, string> = {
  Learned: 'text-green-500',
  Learning: 'text-yellow-500',
  Planned: 'text-text-muted',
}

export default function RoadmapClient({ items }: RoadmapClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null)

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return items
    return items.filter((i) => i.category === selectedCategory)
  }, [items, selectedCategory])

  const byStatus = (status: Status) => filtered.filter((i) => i.status === status)

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={isActive}
              className={
                isActive
                  ? 'px-4 py-1.5 rounded-full bg-accent-dim border border-accent-green text-accent-green text-sm font-mono transition-all duration-200'
                  : 'px-4 py-1.5 rounded-full border border-border-subtle text-text-secondary text-sm font-mono hover:border-accent-green hover:text-accent-green transition-all duration-200'
              }
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* 3 column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {COLUMNS.map(({ status, label, icon }) => {
          const colItems = byStatus(status)
          return (
            <div key={status}>
              {/* Column header */}
              <div className="flex items-center gap-2 mb-4">
                {icon}
                <span className={`text-sm font-mono font-medium ${STATUS_COLORS[status]}`}>
                  {label}
                </span>
                <span className="ml-auto text-xs font-mono text-text-muted bg-bg-glass border border-border-glass rounded px-1.5 py-0.5">
                  {colItems.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {colItems.length === 0 ? (
                  <p className="text-text-muted font-mono text-xs">Nothing here yet.</p>
                ) : (
                  colItems.map((item) => (
                    <RoadmapCard
                      key={item.topic}
                      item={item}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Slide over */}
      <RoadmapSlideOver
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  )
}
