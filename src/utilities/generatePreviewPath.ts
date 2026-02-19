import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  news: '/news',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (!slug) return null

  const cleanSlug = slug.replace(/^\/+/, '')

  const path = `${collectionPrefixMap[collection] || ''}/${cleanSlug}`
    .replace(/\/+/g, '/')

  const params = new URLSearchParams({
    path,
    collection,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}

