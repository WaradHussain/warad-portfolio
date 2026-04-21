'use client'

import { useState, useMemo } from 'react'
import type { SanityProject } from '@/types/sanity'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'

interface ProjectsClientProps {
  projects: SanityProject[]
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selected, setSelected] = useState('All')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)))
    return ['All', ...unique]
  }, [projects])

  const filtered = useMemo(() => {
    if (selected === 'All') return projects
    return projects.filter((p) => p.category === selected)
  }, [projects, selected])

  return (
    <>
      <ProjectFilter
        categories={categories}
        selected={selected}
        onChange={setSelected}
      />

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-text-muted font-mono text-sm">
            No projects in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </>
  )
}
