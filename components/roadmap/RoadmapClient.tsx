'use client'
// components/roadmap/RoadmapClient.tsx

import { useState, useMemo } from 'react'
import type { RoadmapItem } from '@/types/sanity'
import RoadmapCard from './RoadmapCard'
import RoadmapSlideOver from './RoadmapSlideOver'

interface Props {
  items: RoadmapItem[]
}

const STATUS_COLS = [
  { key: 'Learned',  label: 'Learned',      icon: '✓', color: 'text-accent-green' },
  { key: 'Learning', label: 'Learning Now',  icon: '●', color: 'text-yellow-400'   },
  { key: 'Planned',  label: 'Planned',       icon: '○', color: 'text-text-muted'   },
] as const

export default function RoadmapClient({ items }: Props) {
  const [selected, setSelected] = useState('All')
  const [activeItem, setActiveItem] = useState<RoadmapItem | null>(null)

  // Derive categories dynamically from actual Sanity data — no hardcoding
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category).filter(Boolean)))
    return ['All', ...unique.sort()]
  }, [items])

  const filtered = useMemo(() => {
    if (selected === 'All') return items
    return items.filter((i) => i.category === selected)
  }, [items, selected])

  return (
    <>
      {/* Category filter — dynamic from Sanity data */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="group"
        aria-label="Filter roadmap by category"
      >
        {categories.map((cat) => {
          const isActive = selected === cat
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
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

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATUS_COLS.map(({ key, label, icon, color }) => {
          const colItems = filtered.filter((i) => i.status === key)
          return (
            <div key={key}>
              {/* Column header */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`font-mono text-sm font-semibold ${color}`}>
                  {icon} {label}
                </span>
                <span className="ml-auto text-xs font-mono text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full">
                  {colItems.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {colItems.length === 0 ? (
                  <p className="text-text-muted font-mono text-xs py-4">Nothing here yet.</p>
                ) : (
                  colItems.map((item) => (
                    <RoadmapCard
                      key={item.topic + item.status}
                      item={item}
                      onClick={() => setActiveItem(item)}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Slide-over */}
      {activeItem && (
        <RoadmapSlideOver item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </>
  )
}
