'use client'
// components/home/TechStackScroll.tsx
// Animated infinite marquee — Row 1 scrolls left, Row 2 scrolls right
// Hover on row → pauses animation
// Logos auto-loaded from devicons CDN — text badge fallback if no logo

import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { TechStack } from '@/types/sanity'
import { getDeviconUrl, getFallbackColor } from '@/lib/devicons'

interface Props {
  items: TechStack[]
}

function TechItem({ name }: { name: string }) {
  const logoUrl = getDeviconUrl(name)
  const fallbackColor = getFallbackColor(name)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 w-20 h-20 bg-bg-glass border border-border-glass rounded-xl mx-2 hover:border-accent-green/30 transition-colors duration-200">
      {logoUrl && !imgError ? (
        <Image
          src={logoUrl}
          alt={name}
          width={36}
          height={36}
          className="object-contain"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <span
          className="text-xs font-bold px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: `${fallbackColor}20`,
            color: fallbackColor,
            border: `1px solid ${fallbackColor}40`,
          }}
        >
          {name.slice(0, 3).toUpperCase()}
        </span>
      )}
      <span className="text-[10px] font-mono text-text-secondary text-center leading-tight px-1 truncate w-full text-center">
        {name}
      </span>
    </div>
  )
}

interface MarqueeRowProps {
  items: TechStack[]
  direction: 'left' | 'right'
  speed: number
}

function MarqueeRow({ items, direction, speed }: MarqueeRowProps) {
  if (items.length === 0) return null
  // Duplicate array so seamless loop works
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden group"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div
        className="flex"
        style={{
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`,
          animationPlayState: 'running',
          width: 'max-content',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {doubled.map((item, i) => (
          <TechItem key={`${item._id}-${i}`} name={item.name} />
        ))}
      </div>
    </div>
  )
}

export default function TechStackScroll({ items }: Props) {
  const { row1, row2 } = useMemo(() => {
    const row1 = items.filter((i) =>
      ['language', 'framework'].includes(i.category)
    )
    const row2 = items.filter((i) =>
      ['tool', 'database', 'cloud'].includes(i.category)
    )
    // If everything is in one category, split evenly
    if (row1.length === 0) return { row1: items.slice(0, Math.ceil(items.length / 2)), row2: items.slice(Math.ceil(items.length / 2)) }
    if (row2.length === 0) return { row1: items.slice(0, Math.ceil(items.length / 2)), row2: items.slice(Math.ceil(items.length / 2)) }
    return { row1, row2 }
  }, [items])

  if (items.length === 0) {
    return (
      <p className="text-text-muted font-mono text-sm">
        No stack items yet — add them in Sanity Studio under &quot;Tech Stack&quot;.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <MarqueeRow items={row1} direction="left" speed={30} />
      {row2.length > 0 && <MarqueeRow items={row2} direction="right" speed={40} />}
    </div>
  )
}
