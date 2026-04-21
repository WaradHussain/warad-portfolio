import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { sanityClient, sanityFetch, projectBySlugQuery, allProjectSlugsQuery } from '@/lib/sanity'
import type { SanityProjectFull, SanitySlug } from '@/types/sanity'

// ── Badge colors ─────────────────────────────────────────────────────────────

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

function getBadgeColor(tech: string): string {
  return BADGE_COLORS[tech] ?? '#888888'
}

// ── Video embed helper ────────────────────────────────────────────────────────

type VideoEmbed = { type: 'youtube' | 'loom' | 'wistia' | 'gumlet'; id: string }

function getVideoEmbed(url: string): VideoEmbed | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  if (yt) return { type: 'youtube', id: yt[1] }

  const loom = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (loom) return { type: 'loom', id: loom[1] }

  const wistia = url.match(/(?:wistia\.com\/medias\/|fast\.wistia\.net\/embed\/iframe\/)([a-zA-Z0-9]+)/)
  if (wistia) return { type: 'wistia', id: wistia[1] }

  const gumlet = url.match(/play\.gumlet\.io\/embed\/([a-zA-Z0-9]+)/)
  if (gumlet) return { type: 'gumlet', id: gumlet[1] }

  return null
}

function getEmbedUrl(embed: VideoEmbed): string {
  switch (embed.type) {
    case 'youtube': return `https://www.youtube.com/embed/${embed.id}`
    case 'loom':    return `https://www.loom.com/embed/${embed.id}`
    case 'wistia':  return `https://fast.wistia.net/embed/iframe/${embed.id}`
    case 'gumlet':  return `https://play.gumlet.io/embed/${embed.id}`
  }
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<SanitySlug[]>(allProjectSlugsQuery)
    return slugs.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await sanityClient.fetch<SanityProjectFull>(
      projectBySlugQuery,
      { slug }
    )
    if (!project) return {}
    return {
      title: project.title,
      description: project.shortDescription,
      openGraph: {
        images: project.thumbnail ? [project.thumbnail] : [],
      },
    }
  } catch {
    return {}
  }
}

// ── Case study section ────────────────────────────────────────────────────────

function CaseSection({ title, content }: { title: string; content: string }) {
  return (
    <section className="mt-10">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary mb-3">
        <span className="text-accent-green font-mono text-sm">▸</span>
        {title}
      </h3>
      <p className="text-text-secondary leading-relaxed pl-5 whitespace-pre-line">
        {content}
      </p>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let project: SanityProjectFull | null = null
  let allSlugs: SanitySlug[] = []

  try {
    ;[project, allSlugs] = await Promise.all([
      sanityFetch<SanityProjectFull>(projectBySlugQuery, { slug }),
      sanityFetch<SanitySlug[]>(allProjectSlugsQuery),
    ])
  } catch (error) {
    console.error('Failed to fetch project:', error)
  }

  if (!project) notFound()

  // Prev / Next
  const currentIndex = allSlugs.findIndex((p) => p.slug === slug)
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null

  // Video
  const videoEmbed = project.videoUrl ? getVideoEmbed(project.videoUrl) : null

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-6 py-12">

      {/* 1. Breadcrumb */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-text-muted hover:text-accent-green font-mono text-sm transition-colors duration-200"
      >
        ← Projects
      </Link>

      {/* 2. Hero */}
      <div className="mt-6">
        <span className="text-xs font-mono border border-border-subtle rounded px-2 py-0.5 text-text-muted">
          {project.category}
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-text-primary mt-3 leading-tight">
          {project.title}
        </h1>

        <p className="text-text-secondary text-lg leading-relaxed mt-2">
          {project.shortDescription}
        </p>

        {/* Tech badges */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((tech) => {
              const color = getBadgeColor(tech)
              return (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 rounded"
                  style={{ backgroundColor: `${color}26`, color }}
                >
                  {tech}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* 3. Action buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-accent-green/90 transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          View on GitHub
        </a>

        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border-glass text-text-primary px-5 py-2.5 rounded-lg text-sm hover:border-accent-green hover:text-accent-green transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
        )}
      </div>

      {/* 4. Video embed (conditional) */}
      {videoEmbed && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-8 bg-bg-elevated">
          <iframe
            src={getEmbedUrl(videoEmbed)}
            title={`${project.title} — video walkthrough`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      {/* Thumbnail (show only if no video) */}
      {!videoEmbed && project.thumbnail && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-8">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 5. Case study sections */}
      <CaseSection title="The Problem" content={project.problem} />
      <CaseSection title="My Solution" content={project.solution} />
      <CaseSection title="Architecture" content={project.architecture} />
      <CaseSection title="Challenges & How I Solved Them" content={project.challenges} />
      <CaseSection title="Results" content={project.results} />
      <CaseSection title="What I'd Do Differently" content={project.wouldRedo} />

      {/* 6. Tech stack table */}
      {project.techStack?.length > 0 && (
        <div className="mt-10 bg-bg-elevated border border-border-subtle rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-bg-primary px-4 py-3">
            {['Tool', 'Role', 'Why I Chose It'].map((col) => (
              <span key={col} className="font-mono text-xs text-accent-green">
                {col}
              </span>
            ))}
          </div>
          {project.techStack.map((tech, i) => {
            const color = getBadgeColor(tech)
            return (
              <div
                key={tech}
                className={`grid grid-cols-3 px-4 py-3 ${i !== 0 ? 'border-t border-border-subtle' : ''}`}
              >
                <span
                  className="font-mono text-xs self-center"
                  style={{ color }}
                >
                  {tech}
                </span>
                <span className="text-sm text-text-secondary self-center">
                  Core dependency
                </span>
                <span className="text-sm text-text-muted self-center">
                  Best fit for this use case
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* 7. Prev / Next navigation */}
      {(prevSlug || nextSlug) && (
        <div className="mt-16 border-t border-border-subtle pt-8 flex justify-between items-start gap-4">
          {prevSlug ? (
            <Link
              href={`/projects/${prevSlug.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-xs font-mono text-text-muted group-hover:text-accent-green transition-colors duration-200">
                ← Previous
              </span>
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {prevSlug.slug}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextSlug ? (
            <Link
              href={`/projects/${nextSlug.slug}`}
              className="group flex flex-col gap-1 items-end"
            >
              <span className="text-xs font-mono text-text-muted group-hover:text-accent-green transition-colors duration-200">
                Next Project →
              </span>
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {nextSlug.slug}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </main>
  )
}
