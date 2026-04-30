'use client'

import { useState } from 'react'

interface Props {
  context: 'list' | 'post'
  postTitle?: string
}

type Status = 'idle' | 'loading' | 'subscribed' | 'resubscribed' | 'already_subscribed' | 'error'

export default function NewsletterInline({ context, postTitle }: Props) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: firstName.trim(), honeypot }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong.')
        return
      }

      setStatus(data.status || 'subscribed')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Try again.')
    }
  }

  const copy = {
    list: {
      label: 'NEWSLETTER',
      heading: 'The posts you just scrolled through?',
      body: "That's what lands in your inbox. No roundups, no curated links — just writing from someone in the work. Subscribe if you'd rather learn from real experience.",
      cta: 'Get the next one',
    },
    post: {
      label: 'ENJOYED THIS?',
      heading: postTitle
        ? 'If this was worth your time, the next one probably will be too.'
        : 'The next post is already being written.',
      body: "I don't write on a schedule — only when something's worth explaining. Subscribe so you don't have to remember to check back.",
      cta: 'Subscribe',
    },
  }

  const c = copy[context]

  // ── Done states ───────────────────────────────────────────────────────────

  if (status === 'subscribed') {
    return (
      <div className="rounded-2xl border border-accent-green/20 bg-accent-dim px-8 py-7">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-green/10 border border-accent-green/30
                          flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-accent-green text-sm">✓</span>
          </div>
          <div>
            <p className="text-text-primary font-bold text-sm">
              {firstName ? `You're in, ${firstName}.` : "You're in."}
            </p>
            <p className="text-text-secondary text-xs mt-1 leading-relaxed">
              Confirmation heading to your inbox now.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'resubscribed') {
    return (
      <div className="rounded-2xl border border-accent-green/20 bg-accent-dim px-8 py-7">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-green/10 border border-accent-green/30
                          flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-accent-green text-sm">↩</span>
          </div>
          <div>
            <p className="text-text-primary font-bold text-sm">Welcome back.</p>
            <p className="text-text-secondary text-xs mt-1 leading-relaxed">
              You&apos;re re-subscribed. Good to have you back.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'already_subscribed') {
    return (
      <div className="rounded-2xl border border-border-glass bg-bg-glass px-8 py-7">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-glass
                          flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-text-muted text-sm">·</span>
          </div>
          <div>
            <p className="text-text-primary font-bold text-sm">
              You&apos;re already on the list.
            </p>
            <p className="text-text-secondary text-xs mt-1 leading-relaxed">
              This email is already subscribed. Posts will keep coming your way.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl border border-border-glass bg-bg-glass backdrop-blur-sm px-8 py-8">

      <p className="font-mono text-accent-green text-xs tracking-widest mb-4">
        {c.label}
      </p>
      <h3 className="text-text-primary font-bold text-lg leading-snug mb-3">
        {c.heading}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-7">
        {c.body}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Honeypot */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="sm:w-32 bg-bg-elevated border border-border-glass rounded-xl
                       px-4 py-3 text-text-primary text-sm placeholder:text-text-muted
                       focus:outline-none focus:border-accent-green/40 transition-colors"
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 min-w-0 bg-bg-elevated border border-border-glass rounded-xl
                       px-4 py-3 text-text-primary text-sm placeholder:text-text-muted
                       focus:outline-none focus:border-accent-green/40 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-accent-green text-black font-bold text-sm px-6 py-3
                       rounded-xl hover:bg-accent-green/90 transition-all duration-200
                       disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
                       whitespace-nowrap shrink-0"
          >
            {status === 'loading' ? '...' : c.cta}
          </button>
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
        )}
      </form>

      <p className="text-text-muted text-xs mt-4">
        No spam. Unsubscribe any time.
      </p>
    </div>
  )
}
