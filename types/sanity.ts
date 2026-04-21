// ── Blog ────────────────────────────────────────────────────────────────────

export interface SanityPost {
  title: string
  slug: string
  excerpt: string
  category: 'Python' | 'AI' | 'Engineering' | 'Career'
  publishedAt: string
  coverImage: string | null
  coverImageAlt: string | null
  featured: boolean
}

export interface SanityPostFull extends SanityPost {
  // Typed as PortableTextBlock[] at usage point via @portabletext/react
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[]
}

// ── Projects ────────────────────────────────────────────────────────────────

export interface SanityProject {
  title: string
  slug: string
  category: 'Python' | 'AI/ML' | 'Full-Stack' | 'Tools'
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
  category: 'AI/ML' | 'Backend' | 'Cloud' | 'Other'
  image: string
  imageAlt: string
  credentialUrl: string | null
}

// ── Roadmap ─────────────────────────────────────────────────────────────────

export interface RoadmapItem {
  topic: string
  status: 'Learned' | 'Learning' | 'Planned'
  category: 'Backend' | 'AI/ML' | 'DevOps' | 'Frontend' | 'Tools'
  resources: string[]
  projectSlug: string | null
}

// ── Slug helper (for generateStaticParams) ──────────────────────────────────

export interface SanitySlug {
  slug: string
  title?: string
}
