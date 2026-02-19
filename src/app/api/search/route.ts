import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')

  if (!q) {
    return NextResponse.json({ results: [] })
  }

  const payload = await getPayload({ config })

  const news = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 10,
    where: {
      or: [
        {
          title: {
            like: q,
          },
        },
        {
          in_focus: {
            like: q,
          },
        },
        {
          Gutenberg_html: {
            like: q,
          },
        },
      ],
    },
  })

  return NextResponse.json({
    results: news.docs,
  })
}
