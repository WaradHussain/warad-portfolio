'use client'

import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with sessionStorage + event listeners
const NewsletterModal = dynamic(
  () => import('./NewsletterModal'),
  { ssr: false }
)

export default function NewsletterProvider() {
  return <NewsletterModal />
}
