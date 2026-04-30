'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

type Status = 'idle' | 'loading' | 'subscribed' | 'resubscribed' | 'already_subscribed' | 'error'

export default function NewsletterModal() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const isBlogPage = pathname === '/blog' || pathname.startsWith('/blog/')
    if (!isBlogPage) return

    const seen = sessionStorage.getItem('newsletter_seen')
    if (seen) return

    const timer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem('newsletter_seen', '1')
    }, 8000)

    return () => clearTimeout(timer)
  }, [pathname])

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

  if (!visible) return null

  // ── Done states — auto-close after showing message ────────────────────────

  const isDone = ['subscribed', 'resubscribed', 'already_subscribed'].includes(status)

  const doneContent = {
    subscribed: {
      icon: '✓',
      title: firstName ? `You're in, ${firstName}.` : "You're in.",
      body: 'Confirmation heading to your inbox now.',
    },
    resubscribed: {
      icon: '↩',
      title: 'Welcome back.',
      body: "You're re-subscribed. Good to have you back.",
    },
    already_subscribed: {
      icon: '·',
      title: "You're already on the list.",
      body: 'Posts will keep coming your way.',
    },
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 px-4 pb-4 sm:pb-0"
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md bg-bg-secondary border border-border-glass
                      rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-0.5 bg-gradient-to-r from-accent-green via-accent-green/60 to-transparent" />

        <div className="p-8">
          <button
            onClick={() => setVisible(false)}
            aria-label="Close"
            className="absolute top-5 right-5 text-text-muted hover:text-text-primary
                       transition-colors p-1 rounded-lg hover:bg-bg-elevated cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Done states */}
          {isDone && doneContent[status as keyof typeof doneContent] && (
            <div className="text-center py-4">
              <div className="w-10 h-10 rounded-full bg-accent-dim border border-accent-green/20
                              flex items-center justify-center mx-auto mb-5">
                <span className="text-accent-green text-lg">
                  {doneContent[status as keyof typeof doneContent].icon}
                </span>
              </div>
              <p className="text-text-primary font-bold text-lg mb-2">
                {doneContent[status as keyof typeof doneContent].title}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {doneContent[status as keyof typeof doneContent].body}
              </p>
            </div>
          )}

          {/* Form */}
          {!isDone && (
            <>
              <p className="font-mono text-accent-green text-xs tracking-widest mb-5">
                NEWSLETTER
              </p>
              <h2 className="text-text-primary text-xl font-bold mb-3 leading-snug">
                Learn without the grind.
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-7">
                Agentic AI, software engineering fundamentals, real lessons from
                building things. No fluff — only when it&apos;s worth your time.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-glass rounded-xl
                             px-4 py-3 text-text-primary text-sm placeholder:text-text-muted
                             focus:outline-none focus:border-accent-green/40 transition-colors"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-bg-elevated border border-border-glass rounded-xl
                             px-4 py-3 text-text-primary text-sm placeholder:text-text-muted
                             focus:outline-none focus:border-accent-green/40 transition-colors"
                />
                {status === 'error' && (
                  <p className="text-red-400 text-xs">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-accent-green text-black font-bold text-sm py-3.5
                             rounded-xl hover:bg-accent-green/90 transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              <p className="text-text-muted text-xs text-center mt-4">
                No spam. Unsubscribe any time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
