import { subscribeRatelimit, applyRatelimit } from '@/lib/ratelimit'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { limited } = await applyRatelimit(subscribeRatelimit, req)
  if (limited) {
  return NextResponse.json(
    { error: 'Too many requests. Try again later.' },
    { status: 429 }
    )
    }
  try {
    const body = await req.json()

    // Honeypot — bot hai to silently ok return karo
    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!body.email || !emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Env check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase env vars missing')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Supabase insert
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error: dbError } = await supabase
      .from('subscribers')
      .insert({ email: body.email })

    // 23505 = unique_violation (already subscribed) — treat as success
    if (dbError && dbError.code !== '23505') {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Could not subscribe' }, { status: 500 })
    }

    // Welcome email — sirf naye subscribers ko
    if (!dbError) {
      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY missing')
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Warad Hussain <hi@waradhussain.com>',
          to: body.email,
          subject: "You're subscribed to Warad's blog",
          html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#09090b;color:#f0f0f0;padding:32px;border-radius:12px;">
            <p style="color:#00e87a;font-family:monospace;font-size:12px;">waradhussain.com</p>
            <h1 style="font-size:20px;font-weight:700;margin-top:16px;">You're in! 🎉</h1>
            <p style="color:#888888;font-size:14px;line-height:1.7;margin-top:8px;">
              You'll get an email when I publish new posts on Python, AI, and engineering.
            </p>
            <hr style="border:none;border-top:1px solid #1f1f1f;margin:24px 0;"/>
            <p style="color:#555555;font-size:11px;font-family:monospace;">waradhussain.com</p>
          </div>`,
        })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Subscribe route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
