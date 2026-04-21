'use client'

interface ProjectFilterProps {
  categories: string[]
  selected: string
  onChange: (cat: string) => void
}

export default function ProjectFilter({ categories, selected, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
      {categories.map((cat) => {
        const isActive = selected === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
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
  )
}
