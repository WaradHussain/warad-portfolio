import Link from 'next/link'
import Image from 'next/image'
import type { SanityProject } from '@/types/sanity'

// ── Badge color map ──────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, string> = {
  Python: '#3b82f6',
  FastAPI: '#10b981',
  Django: '#16a34a',
  LangChain: '#f59e0b',
  Supabase: '#06b6d4',
  'Next.js': '#a0a0a0',
  PostgreSQL: '#6366f1',
  Docker: '#0ea5e9',
  'AI/ML': '#8b5cf6',
  RAG: '#ec4899',
}

const DEFAULT_COLOR = '#888888'

function getBadgeColor(tech: string): string {
  return BADGE_COLORS[tech] ?? DEFAULT_COLOR
}

// ── Icons ────────────────────────────────────────────────────────────────────

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

// ── Component ────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: SanityProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const visibleTech = project.techStack?.slice(0, 3) ?? []

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl overflow-hidden bg-bg-glass border border-border-glass hover:border-accent-green/20 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Thumbnail */}
      {project.thumbnail ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-bg-elevated to-bg-primary" />
      )}

      {/* Body */}
      <div className="p-5">
        {/* Top row: category + links */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-text-muted border border-border-subtle rounded px-2 py-0.5">
            {project.category}
          </span>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                }}
                role="link"
                tabIndex={0}
                aria-label={`GitHub repository for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                  }
                }}
                className="text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
              >
                <GitHubIcon />
              </span>
            )}
            {project.liveDemoUrl && (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  window.open(project.liveDemoUrl!, '_blank', 'noopener,noreferrer')
                }}
                role="link"
                tabIndex={0}
                aria-label={`Live demo for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    window.open(project.liveDemoUrl!, '_blank', 'noopener,noreferrer')
                  }
                }}
                className="text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
              >
                <ExternalLinkIcon />
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-text-primary mt-2 leading-snug group-hover:text-accent-green transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mt-1 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech badges */}
        {visibleTech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {visibleTech.map((tech) => {
              const color = getBadgeColor(tech)
              return (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${color}26`,
                    color: color,
                  }}
                >
                  {tech}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </Link>
  )
}
