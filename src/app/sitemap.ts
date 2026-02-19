import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({ config: configPromise })
    const baseUrl = getServerSideURL()

    // ===============================
    // 1. Fetch Pages (with fullSlug)
    // ===============================
    const pages = await payload.find({
        collection: 'pages',
        depth: 0,
        limit: 1000,
        where: {
            _status: { equals: 'published' },
        },
        select: {
            slug: true,
            fullSlug: true, // ✅ REQUIRED
            updatedAt: true,
        },
    })

    // ===============================
    // 2. Fetch Posts
    // ===============================
    const posts = await payload.find({
        collection: 'posts',
        depth: 0,
        limit: 1000,
        where: {
            _status: { equals: 'published' },
        },
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    // ===============================
    // 3. Fetch News
    // ===============================
    const news = await payload.find({
        collection: 'news',
        depth: 0,
        limit: 1000,
        where: {
            _status: { equals: 'published' },
        },
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    // ===============================
    // 4. Build Page URLs (Nested Safe)
    // ===============================
    const pageEntries: MetadataRoute.Sitemap = pages.docs.map((doc) => {
        const resolvedSlug =
            doc.fullSlug?.replace(/^\/+/, '') || doc.slug

        return {
            url:
                resolvedSlug === 'home'
                    ? baseUrl
                    : `${baseUrl}/${resolvedSlug}`,
            lastModified: new Date(doc.updatedAt),
        }
    })

    // ===============================
    // 5. Build Post URLs
    // ===============================
    const postEntries: MetadataRoute.Sitemap = posts.docs.map((doc) => ({
        url: `${baseUrl}/posts/${doc.slug}`,
        lastModified: new Date(doc.updatedAt),
    }))

    // ===============================
    // 6. Build News URLs
    // ===============================
    const newsEntries: MetadataRoute.Sitemap = news.docs.map((doc) => ({
        url: `${baseUrl}/news/${doc.slug}`,
        lastModified: new Date(doc.updatedAt),
    }))

    // ===============================
    // 7. Return Final Sitemap
    // ===============================
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...pageEntries,
        ...postEntries,
        ...newsEntries,
    ]
}
