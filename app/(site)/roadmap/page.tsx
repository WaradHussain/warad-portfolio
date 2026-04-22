import type { Metadata } from 'next'
import { sanityClient, allRoadmapQuery } from '@/lib/sanity'
import type { RoadmapItem } from '@/types/sanity'
import RoadmapClient from '@/components/roadmap/RoadmapClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'My public learning roadmap — mastered, studying, and planned.',
}

export default async function RoadmapPage() {
  const items = await sanityClient.fetch<RoadmapItem[]>(allRoadmapQuery)

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent-green font-mono text-sm">04.</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight font-mono">
          Learning OS
        </h1>
        <p className="text-text-secondary mt-2 text-base">
          My public roadmap — what I've mastered, what I'm studying, and what's next.
        </p>
      </div>

      <RoadmapClient items={items} />
    </main>
  )
}
