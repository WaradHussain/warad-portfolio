'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const REASONS = [
  'I get too many emails',
  "The content isn't relevant to me",
  'I never signed up for this',
  'I found what I needed',
  'Other',
]

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''

  const [selected, setSelected] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!email) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason: selected }),
      })

      if (!res.ok) throw new Error('Failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-bg-glass border border-border-glass rounded-2xl p-10">
            <div className="w-12 h-12 rounded-full bg-accent-dim border border-accent-green/20
                            flex items-center justify-center mx-auto mb-6">
              <span className="text-accent-green text-xl">✓</span>
            </div>
            <p className="font-mono text-accent-green text-xs tracking-widest mb-4">
              UNSUBSCRIBED
            </p>
            <h1 className="text-text-primary text-2xl font-bold mb-4">
              You&apos;re out.
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              No hard feelings. Your email has been removed and you won&apos;t
              hear from me again. Thanks for being here for however long you were.
            </p>
            <button
              onClick={() => router.push('/')}
              className="text-accent-green text-sm font-mono hover:underline"
            >
              ← Back to site
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen bg-bg-primary flex items-center justify-center px-4"
      style={{
        backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="max-w-md w-full">

        <div className="bg-bg-glass border border-border-glass rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="h-0.5 bg-gradient-to-r from-accent-green via-accent-green/60 to-transparent" />

          <div className="p-10">
            <p className="font-mono text-accent-green text-xs tracking-widest mb-6">
              UNSUBSCRIBE
            </p>

            <h1 className="text-text-primary text-2xl font-bold mb-3">
              Before you go
            </h1>

            <p className="text-text-secondary text-sm leading-relaxed mb-2">
              Unsubscribing{' '}
              {email && (
                <span className="text-text-primary font-mono text-xs bg-bg-elevated px-2 py-0.5 rounded">
                  {email}
                </span>
              )}
            </p>

            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              One quick question — what made you decide to leave?
              This helps me make the newsletter actually worth reading.
            </p>

            <div className="space-y-3 mb-8">
              {REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelected(reason)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm
                              transition-all duration-200 cursor-pointer
                              ${selected === reason
                                ? 'border-accent-green/40 bg-accent-dim text-text-primary'
                                : 'border-border-glass bg-bg-elevated text-text-secondary hover:border-border-glass/80 hover:text-text-primary'
                              }`}
                >
                  <span className={`mr-3 font-mono text-xs ${selected === reason ? 'text-accent-green' : 'text-text-muted'}`}>
                    {selected === reason ? '●' : '○'}
                  </span>
                  {reason}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full py-3.5 rounded-xl font-bold text-sm
                         transition-all duration-200 cursor-pointer
                         bg-bg-elevated border border-border-glass
                         text-text-secondary hover:border-accent-green/30
                         hover:text-text-primary disabled:opacity-40
                         disabled:cursor-not-allowed"
            >
              {loading ? 'Unsubscribing...' : 'Confirm unsubscribe'}
            </button>

            <p className="text-text-muted text-xs text-center mt-4">
              You can skip the reason — just hit confirm.
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-text-muted text-xs hover:text-text-secondary transition-colors font-mono"
          >
            ← waradhussain.com
          </button>
        </p>

      </div>
    </main>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      <UnsubscribeContent />
    </Suspense>
  )
}
