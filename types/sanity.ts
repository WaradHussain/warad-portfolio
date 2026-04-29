// types/sanity.ts

// ── Blog ────────────────────────────────────────────────────────────────────

export interface SanityPost {
  title: string
  slug: string
  excerpt: string
  category: string
  publishedAt: string
  coverImage: string | null
  coverImageAlt: string | null
  featured: boolean
}

export interface SanityPostFull extends SanityPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[]
}

// ── Projects ────────────────────────────────────────────────────────────────

export interface SanityProject {
  title: string
  slug: string
  category: string
  shortDescription: string
  techStack: string[]
  githubUrl: string
  liveDemoUrl: string | null
  videoUrl: string | null
  thumbnail: string | null
  thumbnailAlt: string | null
  featured: boolean
}

export interface SanityProjectFull extends SanityProject {
  problem: string
  solution: string
  architecture: string
  challenges: string
  results: string
  wouldRedo: string
}

// ── Certificates ────────────────────────────────────────────────────────────

export interface SanityCertificate {
  name: string
  issuer: string
  date: string
  category: string
  image: string
  imageAlt: string
  credentialUrl: string | null
}

// ── Roadmap ─────────────────────────────────────────────────────────────────

export interface RoadmapItem {
  topic: string
  status: 'Learned' | 'Learning' | 'Planned'
  category: string
  resources: string[]
  projectSlug: string | null
}

// ── Tech Stack ───────────────────────────────────────────────────────────────

export interface TechStack {
  _id: string
  name: string
  category: 'language' | 'framework' | 'tool' | 'database' | 'cloud'
  displayOrder: number
}

// ── Currently Building ───────────────────────────────────────────────────────

export interface CurrentlyBuilding {
  _id: string
  emoji: string
  title: string
  description: string
  status: 'planning' | 'building' | 'almost-done' | 'shipped'
  techTags: string[]
  link: string | null
  isVisible: boolean
}

// ── Slug helper ──────────────────────────────────────────────────────────────

export interface SanitySlug {
  slug: string
  title?: string
}
