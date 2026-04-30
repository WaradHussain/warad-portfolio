// lib/simpleicons.ts
// Simple Icons CDN — 3000+ brand SVGs with official hex colors
// URL: https://cdn.simpleicons.org/{slug}/{hexcolor}
// Every logo is crisp, colored, and perfectly visible on dark backgrounds

interface IconConfig {
  slug: string   // Simple Icons slug (see simpleicons.org)
  color: string  // Official brand hex — no # prefix
}

const ICON_MAP: Record<string, IconConfig> = {
  // ── Languages ────────────────────────────────────────────────────────────
  python:       { slug: 'python',          color: '3776AB' },
  typescript:   { slug: 'typescript',      color: '3178C6' },
  javascript:   { slug: 'javascript',      color: 'F7DF1E' },
  go:           { slug: 'go',              color: '00ADD8' },
  golang:       { slug: 'go',              color: '00ADD8' },
  rust:         { slug: 'rust',            color: 'CE422B' },
  java:         { slug: 'openjdk',         color: 'ED8B00' },
  'c++':        { slug: 'cplusplus',       color: '00599C' },
  'c#':         { slug: 'csharp',          color: '512BD4' },
  php:          { slug: 'php',             color: '777BB4' },
  bash:         { slug: 'gnubash',         color: '4EAA25' },
  html:         { slug: 'html5',           color: 'E34F26' },
  css:          { slug: 'css3',            color: '1572B6' },
  sql:          { slug: 'postgresql',      color: '4169E1' },

  // ── Frameworks / Libraries ───────────────────────────────────────────────
  fastapi:      { slug: 'fastapi',         color: '009688' },
  django:       { slug: 'django',          color: '44B78B' }, // lighter green — dark official is invisible
  flask:        { slug: 'flask',           color: 'FFFFFF' },
  react:        { slug: 'react',           color: '61DAFB' },
  'next.js':    { slug: 'nextdotjs',       color: 'FFFFFF' }, // black logo → white on dark bg
  nextjs:       { slug: 'nextdotjs',       color: 'FFFFFF' },
  express:      { slug: 'express',         color: 'FFFFFF' },
  'node.js':    { slug: 'nodedotjs',       color: '339933' },
  nodejs:       { slug: 'nodedotjs',       color: '339933' },
  'vue.js':     { slug: 'vuedotjs',        color: '4FC08D' },
  vue:          { slug: 'vuedotjs',        color: '4FC08D' },
  nuxt:         { slug: 'nuxtdotjs',       color: '00DC82' },
  svelte:       { slug: 'svelte',          color: 'FF3E00' },
  angular:      { slug: 'angular',         color: 'DD0031' },
  laravel:      { slug: 'laravel',         color: 'FF2D20' },
  spring:       { slug: 'spring',          color: '6DB33F' },
  fastify:      { slug: 'fastify',         color: 'FFFFFF' },
  tailwind:     { slug: 'tailwindcss',     color: '06B6D4' },
  'tailwindcss':{ slug: 'tailwindcss',     color: '06B6D4' },

  // ── Databases ────────────────────────────────────────────────────────────
  postgresql:   { slug: 'postgresql',      color: '4169E1' },
  postgres:     { slug: 'postgresql',      color: '4169E1' },
  mysql:        { slug: 'mysql',           color: '4479A1' },
  mongodb:      { slug: 'mongodb',         color: '47A248' },
  redis:        { slug: 'redis',           color: 'FF4438' },
  sqlite:       { slug: 'sqlite',          color: '003B57' },
  supabase:     { slug: 'supabase',        color: '3ECF8E' },
  firebase:     { slug: 'firebase',        color: 'FFCA28' },
  planetscale:  { slug: 'planetscale',     color: 'FFFFFF' },
  cassandra:    { slug: 'apachecassandra', color: '1287B1' },
  elasticsearch:{ slug: 'elasticsearch',  color: '005571' },

  // ── DevOps / Cloud ───────────────────────────────────────────────────────
  docker:       { slug: 'docker',          color: '2496ED' },
  kubernetes:   { slug: 'kubernetes',      color: '326CE5' },
  aws:          { slug: 'amazonwebservices', color: 'FF9900' },
  gcp:          { slug: 'googlecloud',     color: '4285F4' },
  'google cloud':{ slug: 'googlecloud',   color: '4285F4' },
  azure:        { slug: 'microsoftazure',  color: '0078D4' },
  nginx:        { slug: 'nginx',           color: '009639' },
  linux:        { slug: 'linux',           color: 'FCC624' },
  ubuntu:       { slug: 'ubuntu',          color: 'E95420' },
  git:          { slug: 'git',             color: 'F05032' },
  github:       { slug: 'github',          color: 'FFFFFF' }, // black → white
  gitlab:       { slug: 'gitlab',          color: 'FC6D26' },
  vercel:       { slug: 'vercel',          color: 'FFFFFF' }, // black → white
  netlify:      { slug: 'netlify',         color: '00C7B7' },
  terraform:    { slug: 'terraform',       color: '7B42BC' },
  ansible:      { slug: 'ansible',         color: 'EE0000' },
  kafka:        { slug: 'apachekafka',     color: 'FFFFFF' }, // black → white
  rabbitmq:     { slug: 'rabbitmq',        color: 'FF6600' },
  celery:       { slug: 'celery',          color: '37814A' },

  // ── AI / ML ──────────────────────────────────────────────────────────────
  tensorflow:   { slug: 'tensorflow',      color: 'FF6F00' },
  pytorch:      { slug: 'pytorch',         color: 'EE4C2C' },
  openai:       { slug: 'openai',          color: 'FFFFFF' }, // black → white
  huggingface:  { slug: 'huggingface',     color: 'FFD21E' },
  anthropic:    { slug: 'anthropic',       color: 'FFFFFF' },
  ollama:       { slug: 'ollama',          color: 'FFFFFF' },

  // ── Tools ────────────────────────────────────────────────────────────────
  vscode:       { slug: 'visualstudiocode', color: '007ACC' },
  figma:        { slug: 'figma',           color: 'F24E1E' },
  postman:      { slug: 'postman',         color: 'FF6C37' },
  graphql:      { slug: 'graphql',         color: 'E10098' },
  pydantic:     { slug: 'pydantic',        color: 'E92063' },
  pytest:       { slug: 'pytest',          color: '0A9EDC' },
  prisma:       { slug: 'prisma',          color: 'FFFFFF' }, // black → white
  sanity:       { slug: 'sanity',          color: 'F03E2F' },
  stripe:       { slug: 'stripe',          color: '635BFF' },
  twilio:       { slug: 'twilio',          color: 'F22F46' },
  resend:       { slug: 'resend',          color: 'FFFFFF' },
  upstash:      { slug: 'upstash',         color: '00E9A3' },
}

// Techs with no Simple Icons — show styled text badge
const FALLBACK_COLORS: Record<string, string> = {
  langchain:    '#f59e0b',
  groq:         '#6366f1',
  pinecone:     '#06b6d4',
  'ai/ml':      '#8b5cf6',
  rag:          '#ec4899',
  llm:          '#8b5cf6',
  'rag pipeline': '#ec4899',
  crewai:       '#f59e0b',
  llamaindex:   '#8b5cf6',
}

export function getSimpleIconUrl(name: string): string | null {
  const config = ICON_MAP[name.toLowerCase()]
  if (!config) return null
  return `https://cdn.simpleicons.org/${config.slug}/${config.color}`
}

export function getFallbackColor(name: string): string {
  return FALLBACK_COLORS[name.toLowerCase()] ?? '#888888'
}
