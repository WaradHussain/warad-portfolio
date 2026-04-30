'use client'

import { useEffect } from 'react'

/**
 * ConsentHandler — bridges Termly cookie consent → GA4 Consent Mode v2
 *
 * When user accepts analytics in Termly banner, this fires:
 * gtag('consent', 'update', { analytics_storage: 'granted' })
 *
 * Default consent state (denied) is set in layout.tsx via beforeInteractive Script.
 */
export default function ConsentHandler() {
  useEffect(() => {
    const handleTermlyConsent = (event: Event) => {
      const customEvent = event as CustomEvent
      const consent = customEvent.detail

      if (!consent) return

      // Termly passes consent categories — analytics = true means user accepted
      if (consent.analytics === true) {
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
          })
        }
      } else {
        // User rejected or withdrew consent
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            analytics_storage: 'denied',
          })
        }
      }
    }

    document.addEventListener('termly:consent', handleTermlyConsent)

    return () => {
      document.removeEventListener('termly:consent', handleTermlyConsent)
    }
  }, [])

  return null
}

// Extend Window type for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    updateGAConsent: () => void
  }
}
