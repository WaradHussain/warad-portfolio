// types/sanity.ts
// category fields changed from union literals to string
// so any category typed in Sanity Studio works on the frontend

// ── Blog ────────────────────────────────────────────────────────────────────

export interface SanityPost {
  title: string
  slug: string
  excerpt: string
  category: string          // was: 'Python' | 'AI' | 'Engineering' | 'Career'
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
  category: string          // was: 'Python' | 'AI/ML' | 'Full-Stack' | 'Tools'
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
  category: string          // was: 'AI/ML' | 'Backend' | 'Cloud' | 'Other'
  image: string
  imageAlt: string
  credentialUrl: string | null
}

// ── Roadmap ─────────────────────────────────────────────────────────────────

export interface RoadmapItem {
  topic: string
  status: 'Learned' | 'Learning' | 'Planned'
  category: string          // was: 'Backend' | 'AI/ML' | 'DevOps' | 'Frontend' | 'Tools'
  resources: string[]
  projectSlug: string | null
}

// ── Tech Stack (new) ─────────────────────────────────────────────────────────

export interface TechStack {
  _id: string
  name: string
  category: 'language' | 'framework' | 'tool' | 'database' | 'cloud'
  displayOrder: number
}

// ── Currently Building (new) ─────────────────────────────────────────────────

export interface CurrentlyBuilding {
  _id: string
  description: string
  link: string | null
}

// ── Slug helper ──────────────────────────────────────────────────────────────

export interface SanitySlug {
  slug: string
  title?: string
}
