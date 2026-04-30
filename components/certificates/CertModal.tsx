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
  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (cert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
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
      {/*
        KEY FIXES vs old version:
        1. max-h-[90vh]        — hard cap so modal never exceeds the viewport
        2. flex flex-col       — lets image grow and footer stay pinned at bottom
        3. overflow-hidden     — keeps border-radius clean; no child escapes the panel
        4. Image area:
             - aspect-[4/3] + max-h-[60vh] — image keeps proportions but won't eat the screen
             - flex-shrink-0               — image area never compresses to make room for footer
        5. Footer:
             - flex-shrink-0               — footer is ALWAYS fully visible; never pushed off
        6. Close button:
             - z-20 (was z-10)             — always on top of the image
             - sticky via absolute within the non-scrolling container
      */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-bg-elevated rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close button — absolute within modal, z-20 so image never covers it ── */}
        <button
          onClick={onClose}
          aria-label="Close certificate modal"
          className="absolute top-3 right-3 z-20 rounded-full bg-bg-primary/90 border border-border-subtle p-1.5 text-text-secondary hover:text-text-primary hover:border-accent-green/30 transition-all duration-200"
        >
          <X size={16} />
        </button>

        {/* ── Image area — constrained height, never overflows ── */}
        {/*
          aspect-[4/3] gives the container its natural height.
          max-h-[60vh] caps it so at any viewport size the footer stays visible.
          flex-shrink-0 means flex layout won't compress this to make space.
          The `fill` Image then fills this exact bounded box with object-contain.
        */}
        <div
          className="relative w-full flex-shrink-0 aspect-[4/3] max-h-[60vh]"
        >
          <Image
            src={cert.image}
            alt={cert.imageAlt ?? cert.name}
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>

        {/* ── Footer — flex-shrink-0 so it's ALWAYS visible ── */}
        <div className="flex-shrink-0 p-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-elevated">
          <div>
            <p className="font-semibold text-text-primary text-sm pr-8">
              {cert.name}
            </p>
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
