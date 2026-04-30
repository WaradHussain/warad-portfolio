import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // cdn.simpleicons.org added for tech stack logos
              "img-src 'self' data: blob: https://cdn.sanity.io https://cdn.jsdelivr.net https://cdn.simpleicons.org",
              "connect-src 'self' https://*.supabase.co https://api.groq.com https://*.sanity.io wss://*.sanity.io",
              "frame-src https://www.youtube.com https://www.loom.com https://fast.wistia.net https://play.gumlet.io",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },

      // Studio route — looser CSP
      {
        source: '/studio/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.sanity.io",
              "font-src 'self' https://fonts.gstatic.com https://cdn.sanity.io",
              "img-src 'self' data: blob: https://cdn.sanity.io https://lh3.googleusercontent.com",
              "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://api.sanity.io",
              "frame-src 'self' https://cdn.sanity.io",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
