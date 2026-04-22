'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { SanityCertificate } from '@/types/sanity'

interface CertModalProps {
  cert: SanityCertificate | null
  onClose: () => void
}

export default function CertModal({ cert, onClose }: CertModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (cert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [cert])

  if (!cert) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
    >
      <div
        className="relative max-w-4xl w-full bg-bg-elevated rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 rounded-full bg-bg-primary/80 border border-border-subtle p-1.5 text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={cert.image}
            alt={cert.imageAlt ?? cert.name}
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-text-primary text-sm">{cert.name}</p>
            <p className="text-text-secondary font-mono text-xs mt-0.5">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-accent-dim border border-accent-green/30 text-accent-green text-xs px-3 py-1.5 rounded-md font-mono hover:bg-accent-green/10 transition-colors duration-200 shrink-0"
            >
              View Credential ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
