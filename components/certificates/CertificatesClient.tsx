'use client'

import { useState } from 'react'
import CertCard from '@/components/certificates/CertCard'
import CertModal from '@/components/certificates/CertModal'
import type { SanityCertificate } from '@/types/sanity'

interface CertificatesClientProps {
  certs: SanityCertificate[]
}

const INITIAL_COUNT = 6

export default function CertificatesClient({ certs }: CertificatesClientProps) {
  const [selected, setSelected] = useState<SanityCertificate | null>(null)
  const [showAll, setShowAll] = useState(false)

  // Slice only when needed — all data is already in memory from server fetch
  const visibleCerts = showAll ? certs : certs.slice(0, INITIAL_COUNT)
  const hiddenCount = certs.length - INITIAL_COUNT
  const hasMore = certs.length > INITIAL_COUNT

  // ── Empty state ───────────────────────────────────────────────────────────
  if (certs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <span className="text-4xl">🎓</span>
        <p className="text-text-muted font-mono text-sm">No certificates yet.</p>
      </div>
    )
  }

  return (
    <>
      {/* ── Certificate grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCerts.map((cert) => (
          <CertCard
            key={cert.name}
            cert={cert}
            onClick={() => setSelected(cert)}
          />
        ))}
      </div>

      {/* ── Show more button — only renders when there are hidden certs ──── */}
      {hasMore && !showAll && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="group inline-flex items-center gap-2 border border-border-glass bg-bg-glass text-text-secondary hover:text-text-primary hover:border-accent-green/30 hover:bg-white/[0.06] font-mono text-sm px-6 py-2.5 rounded-lg transition-all duration-300"
          >
            Show {hiddenCount} more
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Collapse button — appears after expanding ──────────────────── */}
      {hasMore && showAll && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="group inline-flex items-center gap-2 border border-border-glass bg-bg-glass text-text-secondary hover:text-text-primary hover:border-accent-green/30 hover:bg-white/[0.06] font-mono text-sm px-6 py-2.5 rounded-lg transition-all duration-300"
          >
            Show less
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </>
  )
}
