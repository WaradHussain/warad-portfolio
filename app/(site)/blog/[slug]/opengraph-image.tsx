import { ImageResponse } from 'next/og'
import { sanityClient } from '@/lib/sanity'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await sanityClient.fetch(
    `*[_type=="post" && slug.current==$slug][0]{ title, category }`,
    { slug }
  )

  const catColors: Record<string, string> = {
    Python: '#3b82f6',
    AI: '#8b5cf6',
    Engineering: '#f59e0b',
    Career: '#10b981',
  }
  const catColor = catColors[post?.category ?? ''] ?? '#00e87a'
  const category = post?.category ?? 'Engineering'
  const title = post?.title ?? 'Blog Post'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 70px',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: '#00e87a',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            background: `${catColor}20`,
            color: catColor,
            border: `1px solid ${catColor}40`,
            borderRadius: 6,
            padding: '4px 14px',
            fontSize: 13,
            display: 'flex',
            width: 'fit-content',
            marginBottom: 24,
            fontFamily: 'monospace',
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#f0f0f0',
            lineHeight: 1.15,
            letterSpacing: -2,
            flex: 1,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#00e87a20',
                border: '2px solid #00e87a40',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00e87a',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              WH
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#f0f0f0', fontSize: 16, fontWeight: 600 }}>
                Warad Hussain
              </span>
              <span
                style={{ color: '#888', fontSize: 13, fontFamily: 'monospace' }}
              >
                Python & AI Engineer
              </span>
            </div>
          </div>
          <span
            style={{ color: '#555', fontSize: 13, fontFamily: 'monospace' }}
          >
            waradhussain.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
