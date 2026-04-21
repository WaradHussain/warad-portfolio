'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const input = document.createElement('input')
      input.value = window.location.href
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleX = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(
      `https://linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const btnClass =
    'border border-border-subtle text-text-secondary text-sm px-4 py-2 rounded-lg hover:border-accent-green hover:text-accent-green transition-all duration-200 cursor-pointer'

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={handleCopy} className={btnClass}>
        {copied ? 'Copied! ✓' : 'Copy Link'}
      </button>
      <button onClick={handleX} className={btnClass}>
        Share on X
      </button>
      <button onClick={handleLinkedIn} className={btnClass}>
        Share on LinkedIn
      </button>
    </div>
  )
}
