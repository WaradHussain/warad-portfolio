'use client'
// components/home/CurrentlyBuilding.tsx

import Link from 'next/link'
import type { CurrentlyBuilding } from '@/types/sanity'

interface Props {
  items: CurrentlyBuilding[]
}

const STATUS_CONFIG = {
  planning: {
    label: 'Planning',
    color: 'text-text-muted',
    bg: 'bg-bg-elevated',
    border: 'border-border-subtle',
    dot: 'bg-text-muted',
    pulse: false,
  },
  building: {
    label: 'Building',
    color: 'text-accent-green',
    bg: 'bg-accent-dim',
    border: 'border-accent-green/20',
    dot: 'bg-accent-green',
    pulse: true,
  },
  'almost-done': {
    label: 'Almost Done',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    dot: 'bg-yellow-400',
    pulse: false,
  },
  shipped: {
    label: 'Shipped',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    dot: 'bg-blue-400',
    pulse: false,
  },
} as const

const BADGE_COLORS: Record<string, string> = {
  Python: '#3b82f6',
  FastAPI: '#10b981',
  Django: '#16a34a',
  LangChain: '#f59e0b',
  PostgreSQL: '#6366f1',
  Docker: '#0ea5e9',
  'Next.js': '#a0a0a0',
  Supabase: '#06b6d4',
  TypeScript: '#3b82f6',
  React: '#06b6d4',
  Sanity: '#ec4899',
}

function TechBadge({ name }: { name: string }) {
  const color = BADGE_COLORS[name] ?? '#888888'
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded border"
      style={{
        backgroundColor: `${color}1a`,
        borderColor: `${color}4d`,
        color,
      }}
    >
      {name}
    </span>
  )
}

function BuildingCard({ item }: { item: CurrentlyBuilding }) {
  const status = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.planning

  const card = (
    <div className="bg-bg-glass border border-border-glass backdrop-blur-md rounded-xl p-6 hover:border-accent-green/20 hover:bg-white/[0.06] transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          {item.emoji && (
            <span className="text-2xl">{item.emoji}</span>
          )}
          <h3 className="font-semibold text-text-primary text-base">
            {item.title}
          </h3>
        </div>

        {/* Status badge */}
        <span
          className={`flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${status.color} ${status.bg} ${status.border}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${status.dot} ${status.pulse ? 'animate-pulse' : ''}`}
          />
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Tech tags */}
      {item.techTags && item.techTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.techTags.map((tag) => (
            <TechBadge key={tag} name={tag} />
          ))}
        </div>
      )}

      {/* Shipped link */}
      {item.status === 'shipped' && item.link && (
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <span className="text-xs font-mono text-accent-green">
            View live →
          </span>
        </div>
      )}
    </div>
  )

  if (item.status === 'shipped' && item.link) {
    return (
      <Link href={item.link} target="_blank" rel="noopener noreferrer">
        {card}
      </Link>
    )
  }

  return card
}

export default function CurrentlyBuildingSection({ items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <section className="py-20">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-12">
        <span className="text-accent-green font-mono text-sm">02.</span>
        <h2 className="text-2xl font-bold text-text-primary">Currently Building</h2>
        <div className="flex-1 h-px bg-border-subtle ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 3).map((item) => (
          <BuildingCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  )
}
