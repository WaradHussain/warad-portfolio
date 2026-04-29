'use client'
// components/certificates/CertificatesClient.tsx

import { useState, useMemo } from 'react'
import type { SanityCertificate } from '@/types/sanity'
import CertCard from './CertCard'
import CertModal from './CertModal'

interface Props {
  certs: SanityCertificate[]
}

export default function CertificatesClient({ certs }: Props) {
  const [selected, setSelected] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [activeCert, setActiveCert] = useState<SanityCertificate | null>(null)
  const PAGE_SIZE = 6

  // Derive categories dynamically from actual Sanity data — no hardcoding
  const categories = useMemo(() => {
    const unique = Array.from(new Set(certs.map((c) => c.category).filter(Boolean)))
    return ['All', ...unique.sort()]
  }, [certs])

  const filtered = useMemo(() => {
    if (selected === 'All') return certs
    return certs.filter((c) => c.category === selected)
  }, [certs, selected])

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE)
  const hasMore = filtered.length > PAGE_SIZE && !showAll

  return (
    <>
      {/* Category filter — dynamic from Sanity data */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter certificates by category"
      >
        {categories.map((cat) => {
          const isActive = selected === cat
          return (
            <button
              key={cat}
              onClick={() => { setSelected(cat); setShowAll(false) }}
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

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-text-muted font-mono text-sm">
            No certificates in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((cert) => (
            <CertCard
              key={cert.name + cert.issuer}
              cert={cert}
              onClick={() => setActiveCert(cert)}
            />
          ))}
        </div>
      )}

      {/* Show more button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2.5 rounded-lg border border-border-subtle text-text-secondary text-sm font-mono hover:border-accent-green hover:text-accent-green transition-all duration-200"
          >
            Show all {filtered.length} certificates →
          </button>
        </div>
      )}

      {/* Modal */}
      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </>
  )
}
