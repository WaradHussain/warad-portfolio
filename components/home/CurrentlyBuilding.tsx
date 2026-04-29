// components/home/CurrentlyBuilding.tsx
// Renders the "currently building" pill from Sanity data

import Link from 'next/link'
import type { CurrentlyBuilding } from '@/types/sanity'

interface Props {
  item: CurrentlyBuilding | null
}

export default function CurrentlyBuildingPill({ item }: Props) {
  if (!item) return null

  const pill = (
    <div className="inline-flex items-center gap-3 bg-bg-glass border border-border-glass rounded-full px-4 py-2 hover:border-accent-green/30 transition-colors duration-200">
      <span className="text-accent-green font-mono text-sm">▸ currently building</span>
      <span className="text-text-secondary text-sm">{item.description}</span>
    </div>
  )

  if (item.link) {
    return (
      <Link href={item.link} target="_blank" rel="noopener noreferrer">
        {pill}
      </Link>
    )
  }

  return pill
}
