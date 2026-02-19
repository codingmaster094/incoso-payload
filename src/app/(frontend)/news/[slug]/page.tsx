import type { Metadata } from 'next'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import type { News } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import Image from 'next/image'
import Link from 'next/link'
import NewsToc from './NewsToc'
import { Schema } from '@/components/Schema'
import { generateNewsSchema } from '@/utilities/generateSchema'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'

/* ----------------------------------------
   Extract H2 & H3 From Lexical
---------------------------------------- */
function extractHeadings(state: any) {
  if (!state?.root?.children) return []

  const headings: any[] = []

  state.root.children.forEach((node: any) => {
    // 1️⃣ Normal Lexical Headings
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = node.children?.map((child: any) => child.text || '').join('') || ''

      if (!text) return

      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')

      headings.push({
        id,
        text,
        level: node.tag,
      })
    }

    // 2️⃣ FAQ BLOCK
    if (node.type === 'block' && node.fields?.blockType === 'news_content_faq') {
      const blockHeading = node.fields?.heading

      if (blockHeading) {
        const blockId = blockHeading
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')

        // Add main FAQ heading
        headings.push({
          id: blockId,
          text: blockHeading,
          level: 'h2',
        })
      }

      // Add FAQ questions
      if (node.fields?.accordian?.length) {
        node.fields.accordian.forEach((item: any) => {
          if (!item?.question) return

          const qId = item.question
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-')

          headings.push({
            id: qId,
            text: item.question,
            level: 'h3',
          })
        })
      }
    }
  })

  return headings
}

/* ----------------------------------------
   Render Lexical Content
---------------------------------------- */
function RenderLexical({ state }: { state: any }) {
  if (!state?.root?.children) return null

  const nodes = state.root.children
  const elements: React.ReactNode[] = []

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    // =========================
    // HEADING
    // =========================
    if (node.type === 'heading') {
      const text = node.children?.map((child: any) => child.text || '').join('') || ''

      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')

      // ---------- H2 ----------
      if (node.tag === 'h2') {
        elements.push(
          <div key={`h2-${i}`} className="mb-16 xl:mb-24">
            <h2 id={id} className="text-38 font-semibold scroll-mt-32">
              {text}
            </h2>
            <hr className="border-stroke2 mt-8 mb-8" />
            {/* here */}
          </div>,
        )
        continue
      }

      // ---------- H3 ----------
      if (node.tag === 'h3') {
        elements.push(
          <div key={`h3-${i}`} className="mb-12 xl:mb-16">
            <h3 id={id} className="text-22 font-extrabold font-inter scroll-mt-32">
              {text}
            </h3>
          </div>,
        )
        continue
      }
    }

    // =========================
    // PARAGRAPH
    // =========================
    if (node.type === 'paragraph') {
      if (!node.children?.length) continue

      elements.push(
        <p key={`p-${i}`} className="mb-16">
          {node.children.map((child: any, idx: number) => {
            if (child.type === 'text') {
              return <span key={idx}>{child.text}</span>
            }
            return null
          })}
        </p>,
      )
      continue
    }

    // =========================
    // QUOTE
    // =========================
    if (node.type === 'quote') {
      elements.push(
        <div key={`quote-${i}`} className="bg-light p-24 border-l-4 mb-16">
          <ul className="list-disc list-inside space-y-4">
            {node.children?.map((child: any, idx: number) =>
              child.type === 'text' ? <li key={idx}>{child.text}</li> : null,
            )}
          </ul>
        </div>,
      )
      continue
    }

    // =========================
    // BLOCKS (CTA / FAQ / etc.)
    // =========================
    if (node.type === 'block') {
      const blockType = node.fields?.blockType
      const blockHeading = node.fields?.heading

      if (blockType === 'news_content_faq') {
        const blockId = blockHeading
          ?.toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')

        elements.push(
          <div key={`block-${i}`} id={blockId} className="mb-24">
            <RenderBlocks blocks={[node]} isLexical />
          </div>,
        )
      } else {
        elements.push(
          <div key={`block-${i}`} className="mb-24">
            <RenderBlocks blocks={[node]} isLexical />
          </div>,
        )
      }

      continue
    }
  }

  return <>{elements}</>
}

/* ----------------------------------------
   Static Params
---------------------------------------- */
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'news',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })

  return news.docs
    .filter((doc) => typeof doc.slug === 'string')
    .map(({ slug }) => ({ slug }))
}

/* ----------------------------------------
   Page
---------------------------------------- */
type Args = {
  params: Promise<{ slug?: string }>
}

import { extractTextFromLexical } from '@/utilities/extractTextFromLexical'

function extractFAQs(state: any) {
  if (!state?.root?.children) return []
  const faqs: { question: string; answer: string }[] = []

  state.root.children.forEach((node: any) => {
    if (node.type === 'block' && node.fields?.blockType === 'news_content_faq') {
      if (node.fields?.accordian?.length) {
        node.fields.accordian.forEach((item: any) => {
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

export default async function NewsPage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await params
  const decodedSlug = decodeURIComponent(slug)
  const url = `/news/${decodedSlug}`

  const news = await queryNewsBySlug({ slug: decodedSlug })

  if (!news) return <PayloadRedirects url={url} />

  const headings = extractHeadings(news.Guterncontent)
  const faqs = extractFAQs(news.Guterncontent)

  return (
    <>
      <Schema schema={generateNewsSchema(news, faqs)} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={news.layout as any} />
      {
        news.Guterncontent &&
        <section className="pb-spc">
          <div className="container">
            <div className="flex not-lg:flex-col gap-32 xl:gap-64">
              {/* Sidebar */}
              <div className="w-full lg:max-w-360 shrink-0">
                <div className="sticky top-120 space-y-12 xl:space-y-24">
                  <NewsToc headings={headings} />

                  <div className="bg-light p-24">
                    <ul className="space-y-8">
                      {news.userdetails &&
                        news.userdetails.map((item, i) => {
                          return (
                            <li className="flex items-center gap-8" key={i}>
                              {typeof item?.icons === 'object' && item.icons?.url && (
                                <Image
                                  src={item.icons.url}
                                  width={24}
                                  height={24}
                                  alt={item.icons.alt || ''}
                                />
                              )}

                              <span>{item.title}</span>
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grow">
                <RenderLexical state={news.Guterncontent} />
              </div>
            </div>
            <div className='pt-spc'>

              <h2 className='text-22 font-extrabold mb-12 xl:mb-24'>Related News</h2>
              {news.relatedPosts && news.relatedPosts.length > 0 && (
                <RelatedPosts
                  className="mt-12"
                  docs={news.relatedPosts as News[]}
                  relationTo="news"
                />
              )}
            </div>
          </div>
        </section>
      }
    </>
  )
}


/* ----------------------------------------
   Metadata
---------------------------------------- */
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '' } = await params
  const decodedSlug = decodeURIComponent(slug)
  const news = await queryNewsBySlug({ slug: decodedSlug })
  return generateMeta({ doc: news as any })
}

/* ----------------------------------------
   Query
---------------------------------------- */
const queryNewsBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    depth: 3,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})
