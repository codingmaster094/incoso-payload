import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,

      meta: true,
      heroImage: true,
      publishedAt: true,
    },
  })

  return (
    <div className="py-spc">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>News</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="news"
          currentPage={news.page}
          limit={12}
          totalDocs={news.totalDocs}
        />
      </div>

      <CollectionArchive news={news.docs} relationTo="news" />

      <div className="container">
        {news.totalPages > 1 && news.page && (
          <Pagination page={news.page} totalPages={news.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'News',
  }
}
