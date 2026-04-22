import type { RoadmapItem } from '@/types/sanity'

const CATEGORY_COLORS: Record<string, string> = {
  Backend: '#3b82f6',
  'AI/ML': '#8b5cf6',
  DevOps: '#f59e0b',
  Frontend: '#ec4899',
  Tools: '#71717a',
}

const HOVER_BORDER: Record<string, string> = {
  Learned: 'hover:border-green-500/40',
  Learning: 'hover:border-yellow-500/40',
  Planned: 'hover:border-border-subtle',
}

interface RoadmapCardProps {
  item: RoadmapItem
  onClick: () => void
}

export default function RoadmapCard({ item, onClick }: RoadmapCardProps) {
  const color = CATEGORY_COLORS[item.category] ?? '#888888'
  const hoverBorder = HOVER_BORDER[item.status]

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`bg-bg-glass border border-border-glass rounded-lg px-4 py-3 cursor-pointer transition-all duration-200 ${hoverBorder} flex justify-between items-center gap-3`}
    >
      {/* Left: status icon + topic */}
      <div className="flex items-center gap-2.5 min-w-0">
        {item.status === 'Learned' && (
          <span className="text-green-500 text-xs shrink-0">✓</span>
        )}
        {item.status === 'Learning' && (
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shrink-0" />
        )}
        {item.status === 'Planned' && (
          <span className="text-text-muted text-xs shrink-0">○</span>
        )}
        <span className="text-sm font-medium text-text-primary truncate">
          {item.topic}
        </span>
      </div>

      {/* Right: category badge */}
      <span
        className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
        style={{ backgroundColor: `${color}26`, color }}
      >
        {item.category}
      </span>
    </div>
  )
}
