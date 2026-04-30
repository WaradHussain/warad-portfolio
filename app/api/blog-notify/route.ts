import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderBlogNotification } from '@/emails/BlogNotification'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-webhook-secret')
    if (secret !== process.env.BLOG_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, slug, excerpt } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug are required' }, { status: 400 })
    }

    const postUrl = `https://waradhussain.com/blog/${slug}`

    const { data: contactsData, error } = await resend.contacts.list()

    if (error || !contactsData) {
      console.error('[blog-notify] failed to fetch contacts:', error)
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
    }

    const activeContacts = contactsData.data.filter((c) => !c.unsubscribed)

    if (activeContacts.length === 0) {
      return NextResponse.json({ message: 'No active subscribers.' })
    }

    const results = await Promise.allSettled(
      activeContacts.map(async (contact) => {
        const html = await renderBlogNotification({
          name: contact.first_name || undefined,
          email: contact.email,
          postTitle: title,
          postExcerpt: excerpt || '',
          postUrl,
        })

        return resend.emails.send({
          from: 'Warad Hussain <hi@waradhussain.com>',
          to: contact.email,
          subject: title,
          html,
          headers: {
            'List-Unsubscribe': `<https://waradhussain.com/unsubscribe?email=${encodeURIComponent(contact.email)}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })
      })
    )

    const sent = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.filter((r) => r.status === 'rejected').length

    return NextResponse.json({ success: true, sent, failed })

  } catch (error) {
    console.error('[blog-notify]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
