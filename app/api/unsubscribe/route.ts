import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, reason } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    // Mark contact as unsubscribed in Resend
    await resend.contacts.update({email,
      unsubscribed: true,
    })

    // Send feedback email to Warad
    await resend.emails.send({
      from: 'Newsletter Bot <hi@waradhussain.com>',
      to: 'waradhussainofficial@gmail.com',
      subject: `Unsubscribe — ${email}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;padding:32px;
                    background:#111;border-radius:12px;color:#ccc;">
          <p style="margin:0 0 16px;color:#888;font-size:12px;
                    letter-spacing:2px;font-family:monospace;">UNSUBSCRIBE FEEDBACK</p>
          <p style="margin:0 0 12px;color:#f0f0f0;font-size:16px;">
            <strong>${email}</strong> unsubscribed.
          </p>
          <p style="margin:0;color:#888;font-size:14px;">
            Reason: <span style="color:#00E87A;">${reason || 'No reason given'}</span>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[unsubscribe]', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
