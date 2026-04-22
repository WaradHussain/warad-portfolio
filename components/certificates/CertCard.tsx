import Image from 'next/image'
import type { SanityCertificate } from '@/types/sanity'

interface CertCardProps {
  cert: SanityCertificate
  onClick: () => void
}

export default function CertCard({ cert, onClick }: CertCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/3]"
    >
      {/* Image */}
      <Image
        src={cert.image}
        alt={cert.imageAlt ?? cert.name}
        fill
        className="object-cover"
        unoptimized
      />

      {/* Default gradient overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent h-1/2" />

      {/* Default bottom text */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <p className="font-semibold text-white text-sm leading-snug">{cert.name}</p>
        <p className="text-white/70 text-xs font-mono mt-0.5">{cert.issuer}</p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-bg-primary/92 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-5 text-center gap-2">
        <span className="text-xs font-mono border border-border-subtle rounded px-2 py-0.5 text-text-muted">
          {cert.category}
        </span>
        <p className="font-semibold text-text-primary text-sm leading-snug">{cert.name}</p>
        <p className="text-text-secondary font-mono text-xs">{cert.issuer}</p>
        <p className="text-text-muted font-mono text-xs">{cert.date}</p>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1 bg-accent-dim border border-accent-green/30 text-accent-green text-xs px-3 py-1.5 rounded-md font-mono hover:bg-accent-green/10 transition-colors duration-200"
          >
            View Credential ↗
          </a>
        )}
      </div>
    </div>
  )
}
