// app/(site)/page.tsx
import Link from 'next/link'
import {
  sanityClient,
  allProjectsQuery,
  allPostsQuery,
  techStackQuery,
  currentlyBuildingQuery,
} from '@/lib/sanity'
import type { SanityProject, SanityPost, TechStack, CurrentlyBuilding } from '@/types/sanity'
import Typewriter from '@/components/ui/Typewriter'
import TechStackScroll from '@/components/home/TechStackScroll'
import CurrentlyBuildingSection from '@/components/home/CurrentlyBuilding'

// ── Badge colors ──────────────────────────────────────────────────────────────

const STACK_COLORS: Record<string, string> = {
  Python: '#3b82f6',
  FastAPI: '#10b981',
  Django: '#16a34a',
  LangChain: '#f59e0b',
  PostgreSQL: '#6366f1',
  Docker: '#0ea5e9',
  'AI/ML': '#8b5cf6',
  RAG: '#ec4899',
  'Next.js': '#a0a0a0',
  Supabase: '#06b6d4',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span className="text-accent-green font-mono text-sm">{number}</span>
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      <div className="flex-1 h-px bg-border-subtle ml-4" />
    </div>
  )
}

function TechBadge({ name }: { name: string }) {
  const color = STACK_COLORS[name] ?? '#888888'
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded border"
      style={{
        backgroundColor: `${color}1a`,
        borderColor: `${color}4d`,
        color,
      }}
    >
      {name}
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export const revalidate = 60

export default async function HomePage() {
  const [allProjects, allPosts, techStack, currentlyBuilding] = await Promise.all([
    sanityClient.fetch<SanityProject[]>(allProjectsQuery, {}, { next: { revalidate: 60 } }).catch(() => [] as SanityProject[]),
    sanityClient.fetch<SanityPost[]>(allPostsQuery, {}, { next: { revalidate: 60 } }).catch(() => [] as SanityPost[]),
    sanityClient.fetch<TechStack[]>(techStackQuery, {}, { next: { revalidate: 60 } }).catch(() => [] as TechStack[]),
    sanityClient.fetch<CurrentlyBuilding[]>(currentlyBuildingQuery, {}, { next: { revalidate: 60 } }).catch(() => [] as CurrentlyBuilding[]),
  ])

  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3)
  const latestPost = allPosts[0] ?? null

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="min-h-[85vh] flex items-center py-20">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 bg-accent-dim border border-accent-green/20 rounded-full px-3 py-1 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-accent-green text-sm font-mono">Open to opportunities</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
            Warad Hussain
          </h1>

          <Typewriter />

          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mt-4">
            I build production-grade Python backends and AI systems. Specialized
            in RAG pipelines, FastAPI microservices, and LangChain agents.
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            <Link
              href="/projects"
              className="bg-accent-green text-bg-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="border border-border-glass text-text-primary px-6 py-3 rounded-lg hover:border-accent-green/40 transition-colors"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section className="py-20">
        <SectionHeader number="01." title="Projects" />

        {featuredProjects.length === 0 ? (
          <p className="text-text-muted font-mono text-sm">No featured projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-bg-glass border border-border-glass backdrop-blur-md rounded-xl p-6 hover:border-accent-green/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: `${STACK_COLORS[project.category] ?? '#888'}1a`,
                      borderColor: `${STACK_COLORS[project.category] ?? '#888'}4d`,
                      color: STACK_COLORS[project.category] ?? '#888',
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-accent-green text-lg">↗</span>
                </div>
                <h3 className="font-semibold text-text-primary mt-3 group-hover:text-accent-green transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  {project.shortDescription}
                </p>
                {project.techStack?.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/projects"
            className="font-mono text-sm text-text-muted hover:text-accent-green transition-colors duration-200"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* ── Currently Building — Sanity powered ──────────── */}
      <CurrentlyBuildingSection items={currentlyBuilding} />

      {/* ── Tech Stack — Sanity powered + animated ────────── */}
      <section className="py-20">
        <SectionHeader number="03." title="Stack" />
        <TechStackScroll items={techStack} />
      </section>

      {/* ── Latest Post ───────────────────────────────────── */}
      <section className="py-20">
        <SectionHeader number="04." title="Latest Post" />

        {latestPost ? (
          <Link
            href={`/blog/${latestPost.slug}`}
            className="group bg-bg-glass border border-border-glass backdrop-blur-md rounded-xl p-6 flex justify-between items-center hover:border-accent-green/20 hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="flex-1 min-w-0 pr-6">
              <span className="font-mono text-xs text-accent-green bg-accent-dim border border-accent-green/20 px-2 py-0.5 rounded">
                {latestPost.category}
              </span>
              <p className="text-base font-semibold text-text-primary mt-2 group-hover:text-accent-green transition-colors duration-200">
                {latestPost.title}
              </p>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {latestPost.excerpt}
              </p>
            </div>
            <span className="text-accent-green text-xl flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        ) : (
          <p className="text-text-muted font-mono text-sm">No posts yet.</p>
        )}

        <div className="mt-6">
          <Link
            href="/blog"
            className="font-mono text-sm text-text-muted hover:text-accent-green transition-colors duration-200"
          >
            View all posts →
          </Link>
        </div>
      </section>

      {/* ── Contact Strip ─────────────────────────────────── */}
      <section className="py-20 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="font-semibold text-text-primary">Get in touch</p>
            <p className="text-text-muted text-sm font-mono mt-1">
              contact@waradhussain.com
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="https://github.com/WaradHussain"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-subtle text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-green hover:text-accent-green transition-all"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/waradhussain"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-subtle text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-green hover:text-accent-green transition-all"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
