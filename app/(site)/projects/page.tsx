import type { Metadata } from 'next'
import { sanityFetch, allProjectsQuery } from '@/lib/sanity'
import type { SanityProject } from '@/types/sanity'
import ProjectsClient from '@/components/projects/ProjectsClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production-grade with full case studies.',
}

export default async function ProjectsPage() {
  let projects: SanityProject[] = []

  try {
    projects = await sanityFetch<SanityProject[]>(allProjectsQuery, {}, 3600)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    // Render with empty array — empty state handles it
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent-green font-mono text-sm">01.</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight font-mono">
          Projects
        </h1>
        <p className="text-text-secondary mt-2 text-base">
          Production-grade work with case studies and video walkthroughs.
        </p>
      </div>

      {/* Filter + Grid */}
      <ProjectsClient projects={projects} />
    </main>
  )
}
