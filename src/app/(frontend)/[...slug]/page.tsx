import type { Metadata } from 'next'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageClient from './page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { homeStatic } from '@/endpoints/seed/home-static'
import { Schema } from '@/components/Schema'
import { generatePageSchema } from '@/utilities/generateSchema'

/* ----------------------------------------
   Static Params (SSG)
---------------------------------------- */
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    depth: 3,
    limit: 1000,
    pagination: false,
    select: {
      fullSlug: true,
    },
  })

  return pages.docs
    .map((doc) => doc.fullSlug)
    .filter((fullSlug): fullSlug is string => typeof fullSlug === 'string')
    .map((fullSlug) => ({
      slug: fullSlug.split('/'),
    }))
}

/* ----------------------------------------
   Types
---------------------------------------- */
type Args = {
  params: Promise<{
    slug?: string[]
  }>
}


import { extractTextFromLexical } from '@/utilities/extractTextFromLexical'

function extractFAQsFromBlocks(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return []
  const faqs: { question: string; answer: string }[] = []

  blocks.forEach((block: any) => {
    if (block.blockType === 'news_content_faq') {
      if (block.accordian?.length) {
        block.accordian.forEach((item: any) => {
          if (item?.question && item?.answer) {
            const answerText = extractTextFromLexical(item.answer)
            faqs.push({ question: item.question, answer: answerText })
          }
        })
      }
    }
  })
  return faqs
}

/* ----------------------------------------
   Page
---------------------------------------- */
export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()

  const resolvedParams = await params
  const slugArray = resolvedParams.slug ?? ['home']

  const decodedSlug = slugArray
    .map(decodeURIComponent)
    .join('/')
    .replace(/^\/+/, '')

  const url = '/' + decodedSlug

  let page = await queryPageByFullSlug({ fullSlug: decodedSlug })

  if (!page && decodedSlug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const faqs = extractFAQsFromBlocks(page.layout)

  return (
    <article>
      <Schema schema={generatePageSchema(page, faqs)} />
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout} isLexical={false} />
    </article>
  )
}


/* ----------------------------------------
   Metadata
---------------------------------------- */
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const resolvedParams = await params
  const slugArray = resolvedParams.slug ?? ['home']

  const decodedSlug = slugArray
    .map(decodeURIComponent)
    .join('/')
    .replace(/^\/+/, '')

  const page = await queryPageByFullSlug({ fullSlug: decodedSlug })

  return generateMeta({ doc: page })
}


/* ----------------------------------------
   Payload Query (FULL SLUG)
---------------------------------------- */
const queryPageByFullSlug = cache(
  async ({
    fullSlug,
  }: {
    fullSlug: string
  }): Promise<RequiredDataFromCollectionSlug<'pages'> | null> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      depth: 3,
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        fullSlug: {
          equals: fullSlug,
        },
      },
    })

    return result.docs?.[0] || null
  }
)
