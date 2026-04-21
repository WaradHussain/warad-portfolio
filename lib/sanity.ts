import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { groq } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ── Environment Validation ───────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
if (!dataset) throw new Error('NEXT_PUBLIC_SANITY_DATASET is not set in .env.local')

// ── Read-only Client (no token — public data only) ───────────────────────────

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

// ── Image URL Builder ────────────────────────────────────────────────────────

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Generic Fetch (error handling + ISR revalidation) ────────────────────────

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate: number = 60
): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params, {
      next: { revalidate },
    })
    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw new Error(
      `Failed to fetch from Sanity: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

// ── GROQ Queries ─────────────────────────────────────────────────────────────

// BLOG

export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  featured,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  body,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`

export const relatedPostsQuery = groq`*[_type == "post" && category == $category && slug.current != $slug][0..1] {
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "coverImage": coverImage.asset->url
}`

export const allPostSlugsQuery = groq`*[_type == "post"]{"slug": slug.current}`

// PROJECTS

export const allProjectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc) {
  title,
  "slug": slug.current,
  category,
  shortDescription,
  techStack,
  featured,
  githubUrl,
  liveDemoUrl,
  videoUrl,
  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  category,
  shortDescription,
  techStack,
  githubUrl,
  liveDemoUrl,
  videoUrl,
  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt,
  problem,
  solution,
  architecture,
  challenges,
  results,
  wouldRedo
}`

export const allProjectSlugsQuery = groq`*[_type == "project"]{"slug": slug.current}`

// CERTIFICATES

export const allCertificatesQuery = groq`*[_type == "certificate"] | order(order asc, _createdAt desc) {
  name,
  issuer,
  date,
  category,
  credentialUrl,
  "image": image.asset->url,
  "imageAlt": image.alt
}`

// ROADMAP

export const allRoadmapQuery = groq`*[_type == "roadmap"] | order(order asc) {
  topic,
  status,
  category,
  resources,
  projectSlug
}`
