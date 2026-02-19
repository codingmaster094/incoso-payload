type PageDoc = {
  slug?: string | null
  fullSlug?: string | null
  parent?: string | { slug?: string | null; fullSlug?: string | null } | null
}

export const buildFullSlug = async ({ data, req }: { data: PageDoc; req: any }) => {
  if (!data?.slug) return data

  // Normalize child slug
  const slug = data.slug.replace(/^\/+/, '')

  let parentFullSlug = ''

  if (data.parent) {
    const parent =
      typeof data.parent === 'string'
        ? await req.payload.findByID({
            collection: 'pages',
            id: data.parent,
          })
        : data.parent

    parentFullSlug = parent?.fullSlug || parent?.slug || ''
  }

  parentFullSlug = parentFullSlug.replace(/^\/+/, '')

  // Build full slug
  const fullSlug = parentFullSlug
    ? `${parentFullSlug}/${slug}`
    : slug

  // 🔑 CRITICAL: return updated data
  return {
    ...data,
    slug,
    fullSlug,
  }
}
