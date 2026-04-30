import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { applyRatelimit, subscribeRatelimit } from '@/lib/ratelimit'
import { renderConfirmation } from '@/emails/SubscriptionConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { email, firstName, honeypot } = body

    if (honeypot) return NextResponse.json({ success: true })

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Enter a valid email address.' },
        { status: 400 }
      )
    }

    const name = firstName?.trim() || undefined

    // ── Try creating new contact ───────────────────────────────────────────
    try {
      await resend.contacts.create({
        email,
        firstName: name,
        unsubscribed: false,
      })

      // Genuinely new subscriber — send confirmation
      const html = await renderConfirmation({ name, email, isWelcomeBack: false })

      await resend.emails.send({
        from: 'Warad Hussain <hi@waradhussain.com>',
        to: email,
        subject: "you're in.",
        html,
        headers: {
          'List-Unsubscribe': `<https://waradhussain.com/unsubscribe?email=${encodeURIComponent(email)}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      })

      return NextResponse.json({ success: true, status: 'subscribed' })

    } catch (createError: unknown) {
      const msg = createError instanceof Error ? createError.message.toLowerCase() : ''

      if (msg.includes('already exists')) {

        // ── Contact exists — fetch to check if unsubscribed ───────────────
        let isUnsubscribed = false

        try {
          const { data: contact } = await resend.contacts.get({ email })
          isUnsubscribed = contact?.unsubscribed === true
        } catch {
          // Can't fetch — assume active, don't send email
          return NextResponse.json({
            success: false,
            status: 'already_subscribed',
            message: "You're already on the list.",
          })
        }

        if (!isUnsubscribed) {
          // Active subscriber — just tell them, no email
          return NextResponse.json({
            success: false,
            status: 'already_subscribed',
            message: "You're already on the list.",
          })
        }

        // Was unsubscribed — re-enable and send welcome back
        await resend.contacts.update({ email, unsubscribed: false })

        const html = await renderConfirmation({ name, email, isWelcomeBack: true })

        await resend.emails.send({
          from: 'Warad Hussain <hi@waradhussain.com>',
          to: email,
          subject: 'welcome back.',
          html,
          headers: {
            'List-Unsubscribe': `<https://waradhussain.com/unsubscribe?email=${encodeURIComponent(email)}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })

        return NextResponse.json({
          success: true,
          status: 'resubscribed',
          message: "Welcome back. You're re-subscribed.",
        })
      }

      throw createError
    }

  } catch (error) {
    console.error('[subscribe]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Try again in a moment.' },
      { status: 500 }
    )
  }
}
