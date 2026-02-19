import { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = getServerSideURL()
  const payload = await getPayload({ config: configPromise })

  const robotsConfig = (await payload.findGlobal({
    slug: 'robots' as any,
  })) as any

  const rules = robotsConfig.rules?.map((rule: any) => ({
    userAgent: rule.userAgent || '*',
    allow: rule.allow || undefined,
    disallow: rule.disallow || undefined,
  })) || [
    {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/*',
    },
  ]

  const sitemaps = robotsConfig.sitemaps?.map((s: any) => s.url) || [`${baseUrl}/sitemap.xml`]

  return {
    rules,
    sitemap: sitemaps,
  }
}
