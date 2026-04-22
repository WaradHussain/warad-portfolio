'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterModal() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!pathname.startsWith('/blog')) return
    
    if (sessionStorage.getItem('newsletter-shown')) return

    const show = () => {
      if (sessionStorage.getItem('newsletter-shown')) return
      sessionStorage.setItem('newsletter-shown', '1')
      setVisible(true)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    timerRef.current = setTimeout(show, 30000)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [pathname])

  useEffect(() => {
    if (state === 'success') {
      const t = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(t)
    }
  }, [state])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [visible])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: honeypot }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Try again.')
        setState('error')
        return
      }

      setState('success')
    } catch {
      setErrorMsg('Something went wrong. Try again.')
      setState('error')
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={() => setVisible(false)}
    >
      <div
        className="bg-bg-elevated border border-border-glass rounded-2xl p-8 max-w-sm w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close newsletter"
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors duration-200"
        >
          <X size={18} />
        </button>

        {state === 'success' ? (
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <div className="w-12 h-12 rounded-full bg-accent-dim border border-accent-green/20 flex items-center justify-center">
              <span className="text-accent-green text-xl">✓</span>
            </div>
            <p className="font-bold text-xl text-text-primary">You're subscribed!</p>
            <p className="text-text-secondary text-sm">Thanks for joining. See you in your inbox.</p>
          </div>
        ) : (
          <>
            {/* Icon */}
            <div className="w-12 h-12 bg-accent-dim border border-accent-green/20 rounded-full flex items-center justify-center mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h2 className="font-bold text-xl text-text-primary">Stay in the loop</h2>
            <p className="text-text-secondary text-sm mt-1 leading-relaxed">
              Get notified when I publish new posts on Python, AI, and engineering.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              {/* Honeypot */}
              <input
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Email */}
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === 'loading'}
                className="w-full bg-bg-primary border border-border-glass rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:border-accent-green/50 outline-none transition-colors duration-200 disabled:opacity-50"
              />

              {/* Error */}
              {state === 'error' && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state === 'loading'}
                className="w-full bg-accent-green text-bg-primary font-semibold rounded-lg py-3 text-sm hover:bg-accent-green/90 transition-colors duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {state === 'loading' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            <p className="font-mono text-xs text-text-muted text-center mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
