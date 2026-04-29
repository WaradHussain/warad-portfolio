// lib/devicons.ts
// Maps tech names to their devicons.dev slug
// Logo URL: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{slug}/{slug}-original.svg
// If no devicon exists → returns null → TechStackScroll shows text badge fallback

const DEVICON_MAP: Record<string, string> = {
  // Languages
  python: 'python',
  typescript: 'typescript',
  javascript: 'javascript',
  go: 'go',
  rust: 'rust',
  java: 'java',
  'c++': 'cplusplus',
  c: 'c',
  bash: 'bash',
  html: 'html5',
  css: 'css3',

  // Frameworks
  fastapi: 'fastapi',
  django: 'django',
  flask: 'flask',
  react: 'react',
  nextjs: 'nextjs',
  'next.js': 'nextjs',
  express: 'express',
  nodejs: 'nodejs',
  'node.js': 'nodejs',
  vue: 'vuejs',
  nuxt: 'nuxtjs',

  // Databases
  postgresql: 'postgresql',
  postgres: 'postgresql',
  mysql: 'mysql',
  mongodb: 'mongodb',
  redis: 'redis',
  sqlite: 'sqlite',
  supabase: 'supabase',

  // DevOps / Cloud
  docker: 'docker',
  kubernetes: 'kubernetes',
  aws: 'amazonwebservices',
  gcp: 'googlecloud',
  azure: 'azure',
  nginx: 'nginx',
  linux: 'linux',
  ubuntu: 'ubuntu',
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',

  // Tools
  vscode: 'vscode',
  figma: 'figma',
  postman: 'postman',
  graphql: 'graphql',
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
}

// Badge color fallback when no devicon exists
const FALLBACK_COLORS: Record<string, string> = {
  langchain: '#f59e0b',
  openai: '#10b981',
  groq: '#6366f1',
  pinecone: '#06b6d4',
  celery: '#8b5cf6',
  rabbitmq: '#ec4899',
  'ai/ml': '#8b5cf6',
  rag: '#ec4899',
}

export function getDeviconSlug(name: string): string | null {
  return DEVICON_MAP[name.toLowerCase()] ?? null
}

export function getDeviconUrl(name: string): string | null {
  const slug = getDeviconSlug(name)
  if (!slug) return null
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`
}

export function getFallbackColor(name: string): string {
  return FALLBACK_COLORS[name.toLowerCase()] ?? '#888888'
}
