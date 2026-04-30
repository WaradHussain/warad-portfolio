'use client'
// components/home/TechStackScroll.tsx
// Simple Icons — perfect brand colors on dark bg
// Pure CSS seamless loop — zero gap
// Pointer drag to scroll
// Hover pause
// Glass fade edges

import { useMemo, useRef, useEffect, useCallback } from 'react'
import type { TechStack } from '@/types/sanity'
import { getSimpleIconUrl, getFallbackColor } from '@/lib/simpleicons'

// ── Constants ─────────────────────────────────────────────────────────────────
const ITEM_WIDTH = 88   // px — fixed width per item (card + gap)
const ITEM_GAP   = 12   // px — gap between cards

// ── Single tech item ──────────────────────────────────────────────────────────
function TechItem({ name }: { name: string }) {
  const iconUrl     = getSimpleIconUrl(name)
  const fallback    = getFallbackColor(name)

  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-border-glass bg-bg-glass backdrop-blur-sm hover:border-accent-green/40 hover:bg-white/[0.06] transition-colors duration-200 select-none"
      style={{ width: ITEM_WIDTH - ITEM_GAP, height: 84, marginRight: ITEM_GAP }}
    >
      {iconUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={iconUrl}
          alt={name}
          width={32}
          height={32}
          draggable={false}
          style={{ objectFit: 'contain', width: 32, height: 32 }}
        />
      ) : (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded font-mono"
          style={{
            backgroundColor: `${fallback}20`,
            color: fallback,
            border: `1px solid ${fallback}40`,
          }}
        >
          {name.slice(0, 4).toUpperCase()}
        </span>
      )}
      <span className="text-[9px] font-mono text-text-secondary text-center leading-tight w-full px-1 truncate text-center">
        {name}
      </span>
    </div>
  )
}

// ── Marquee row ───────────────────────────────────────────────────────────────
interface RowProps {
  items: TechStack[]
  direction: 'left' | 'right'
  speed: number // pixels per second
}

function MarqueeRow({ items, direction, speed }: RowProps) {
  const trackRef    = useRef<HTMLDivElement>(null)
  const rafRef      = useRef<number>(0)
  const posRef      = useRef<number>(0)        // current translateX in px
  const pausedRef   = useRef<boolean>(false)
  const dragRef     = useRef<{ active: boolean; startX: number; startPos: number }>({
    active: false, startX: 0, startPos: 0,
  })
  const lastTimeRef = useRef<number | null>(null)

  // Total width of ONE set of items
  const setWidth = items.length * ITEM_WIDTH

  // Direction multiplier: left = negative, right = positive
  const dir = direction === 'left' ? -1 : 1

  const setTranslate = useCallback((x: number) => {
    if (!trackRef.current) return
    trackRef.current.style.transform = `translateX(${x}px)`
  }, [])

  // Wrap position so it always stays within [-setWidth, 0]
  const wrap = useCallback((x: number): number => {
    // Normalise into [0, setWidth)
    const mod = ((x % setWidth) + setWidth) % setWidth
    // Map back to [-setWidth, 0] range
    return mod - setWidth
  }, [setWidth])

  // rAF loop
  const tick = useCallback((timestamp: number) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp
    const delta = (timestamp - lastTimeRef.current) / 1000 // seconds
    lastTimeRef.current = timestamp

    if (!pausedRef.current && !dragRef.current.active) {
      posRef.current = wrap(posRef.current + dir * speed * delta)
      setTranslate(posRef.current)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [dir, speed, wrap, setTranslate])

  useEffect(() => {
    // Start position
    posRef.current = direction === 'left' ? 0 : -setWidth + 1
    setTranslate(posRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick, direction, setWidth, setTranslate])

  // ── Pointer drag handlers ─────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX, startPos: posRef.current }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    posRef.current = wrap(dragRef.current.startPos + dx)
    setTranslate(posRef.current)
  }

  const onPointerUp = () => {
    dragRef.current.active = false
    lastTimeRef.current = null // reset delta so no jump after drag
  }

  // ── Hover pause ───────────────────────────────────────────────────────────
  const onMouseEnter = () => { pausedRef.current = true }
  const onMouseLeave = () => {
    pausedRef.current = false
    lastTimeRef.current = null
  }

  if (items.length === 0) return null

  // Triple-clone so there's always content visible at any drag position
  const tripled = [...items, ...items, ...items]

  return (
    <div
      className="overflow-hidden relative cursor-grab active:cursor-grabbing"
      style={{
        // Glass fade on both edges
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Subtle glass shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, rgba(10,10,10,0.6) 0%, transparent 12%, transparent 88%, rgba(10,10,10,0.6) 100%)',
        }}
      />

      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: tripled.length * ITEM_WIDTH }}
      >
        {tripled.map((item, i) => (
          <TechItem key={`${item._id}-${i}`} name={item.name} />
        ))}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function TechStackScroll({ items }: { items: TechStack[] }) {
  const { row1, row2 } = useMemo(() => {
    const r1 = items.filter((i) => ['language', 'framework'].includes(i.category))
    const r2 = items.filter((i) => ['tool', 'database', 'cloud'].includes(i.category))

    // Fallback: split evenly if all in same category
    if (r1.length === 0) {
      const mid = Math.ceil(items.length / 2)
      return { row1: items.slice(0, mid), row2: items.slice(mid) }
    }
    if (r2.length === 0) {
      const mid = Math.ceil(items.length / 2)
      return { row1: items.slice(0, mid), row2: items.slice(mid) }
    }
    return { row1: r1, row2: r2 }
  }, [items])

  if (items.length === 0) {
    return (
      <p className="text-text-muted font-mono text-sm">
        No stack items yet — add them in Sanity Studio under &quot;Tech Stack&quot;.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <MarqueeRow items={row1} direction="left"  speed={80} />
      {row2.length > 0 && (
        <MarqueeRow items={row2} direction="right" speed={65} />
      )}
    </div>
  )
}
