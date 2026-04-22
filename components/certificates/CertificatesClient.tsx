'use client'

import { useState, useMemo } from 'react'
import type { SanityCertificate } from '@/types/sanity'
import CertCard from './CertCard'
import CertModal from './CertModal'

const CATEGORIES = ['All', 'AI/ML', 'Backend', 'Cloud', 'Other'] as const

interface CertificatesClientProps {
  certs: SanityCertificate[]
}

export default function CertificatesClient({ certs }: CertificatesClientProps) {
  const [selected, setSelected] = useState('All')
  const [activeCert, setActiveCert] = useState<SanityCertificate | null>(null)

  const filtered = useMemo(() => {
    if (selected === 'All') return certs
    return certs.filter((c) => c.category === selected)
  }, [certs, selected])

  return (
    <>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => {
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

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-text-muted font-mono text-sm">
            No certificates in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cert) => (
            <CertCard
              key={cert.name}
              cert={cert}
              onClick={() => setActiveCert(cert)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  )
}
