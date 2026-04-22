import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

/*
SANITY WEBHOOK SETUP:
1. sanity.io → project → API → Webhooks → Add webhook
2. URL: https://waradhussain.com/api/blog-notify
3. Trigger: On create/update
4. Filter: _type == "post" && defined(publishedAt)
5. HTTP method: POST
6. Secret: strong random string → copy to BLOG_WEBHOOK_SECRET in Vercel env vars
*/

export async function POST(req: NextRequest) {
  // Raw body — signature check ke liye parse se pehle chahiye
  const body = await req.text()

  // Signature check
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  if (!signature) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.BLOG_WEBHOOK_SECRET) {
    console.error('BLOG_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const isValid = await isValidSignature(body, signature, process.env.BLOG_WEBHOOK_SECRET)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // Parse payload
  let payload: { title?: string; excerpt?: string; slug?: { current?: string } }
  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { title, excerpt } = payload
  const slug = payload.slug?.current

  if (!title || !slug) {
    return NextResponse.json({ error: 'Missing title or slug' }, { status: 400 })
  }

  const postUrl = `https://waradhussain.com/blog/${slug}`

  // Supabase — subscribers fetch karo
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase env vars missing')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data: subscribers, error: dbError } = await supabase
    .from('subscribers')
    .select('email')

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!subscribers?.length) {
    console.log('No subscribers — skipping email send')
    return NextResponse.json({ ok: true, sent: 0 })
  }

  // Resend batch send (free tier: 100/batch, using 90 to be safe)
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY missing')
    return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  for (let i = 0; i < subscribers.length; i += 90) {
    const batch = subscribers.slice(i, i + 90)

    await resend.batch.send(
      batch.map((sub) => ({
        from: 'Warad Hussain <hi@waradhussain.com>',
        to: sub.email,
        subject: `New post: ${title}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#09090b;color:#f0f0f0;padding:40px 32px;border-radius:12px;">
          <p style="color:#00e87a;font-family:monospace;font-size:12px;margin:0 0 20px;">waradhussain.com</p>
          <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;line-height:1.3;">${title}</h1>
          <p style="color:#888888;font-size:14px;line-height:1.7;margin:0 0 20px;">${excerpt ?? ''}</p>
          <a href="${postUrl}" style="display:inline-block;background:#00e87a;color:#09090b;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Read post →</a>
          <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0;"/>
          <p style="color:#555555;font-size:11px;font-family:monospace;margin:0;">
            waradhussain.com &nbsp;·&nbsp;
            <a href="https://waradhussain.com/unsubscribe?email=${encodeURIComponent(sub.email)}" style="color:#555555;text-decoration:underline;">Unsubscribe</a>
          </p>
        </div>`,
      }))
    )
  }

  console.log(`Blog notify: sent to ${subscribers.length} subscribers — "${title}"`)
  return NextResponse.json({ ok: true, sent: subscribers.length })
}
