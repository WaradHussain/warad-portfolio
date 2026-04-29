// app/api/revalidate/route.ts
// Sanity webhook calls this every time content is published/updated/deleted
// This instantly purges Next.js cache for affected pages

import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const type: string = body?._type ?? 'unknown'

    switch (type) {
      case 'post':
        revalidatePath('/blog')
        revalidatePath('/blog/[slug]', 'page')
        revalidatePath('/')
        break
      case 'project':
        revalidatePath('/projects')
        revalidatePath('/projects/[slug]', 'page')
        revalidatePath('/')
        break
      case 'certificate':
        revalidatePath('/certificates')
        break
      case 'roadmap':
        revalidatePath('/roadmap')
        break
      case 'techStack':
        revalidatePath('/')
        break
      case 'currentlyBuilding':
        revalidatePath('/')
        break
      default:
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 })
  }
}

// GET — manual trigger for testing
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, message: 'Full site revalidated', now: Date.now() })
}
