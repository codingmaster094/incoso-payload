import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const secret = searchParams.get('previewSecret')

  if (!path || secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse('Invalid preview request', { status: 401 })
  }

  if (!path.startsWith('/')) {
    return new NextResponse('Invalid preview path', { status: 400 })
  }

  // ✅ FIX: await draftMode()
  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL(path, req.url))
}
