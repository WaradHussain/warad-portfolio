'use client'

import { useEffect } from 'react'

interface TermlyEmbedProps {
  policyUuid: string
}

/**
 * TermlyEmbed — renders a Termly policy (Privacy Policy / Terms) as an iframe embed.
 * Usage: <TermlyEmbed policyUuid="YOUR_POLICY_UUID" />
 * Get policy UUID from: termly.io → Policies → your policy → Embed
 */
export default function TermlyEmbed({ policyUuid }: TermlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.termly.io/embed-policy.min.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      // @ts-expect-error — Termly uses non-standard 'name' attribute on div
      name="termly-embed"
      data-id={policyUuid}
      data-type="iframe"
      className="w-full min-h-[600px]"
    />
  )
}
