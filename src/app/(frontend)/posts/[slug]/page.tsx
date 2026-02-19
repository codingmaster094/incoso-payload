import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Schema } from '@/components/Schema'
import { generatePostSchema } from '@/utilities/generateSchema'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

import { extractTextFromLexical } from '@/utilities/extractTextFromLexical'

function extractFAQsFromLexical(state: any) {
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

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const faqs = extractFAQsFromLexical(post.Guterncontent)

  return (
    <article className="pt-16 pb-16">
      <Schema schema={generatePostSchema(post, faqs)} />
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* <PostHero post={post} /> */}

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {post.Guterncontent && (
            <RichText
              className="max-w-[48rem] mx-auto"
              data={post.Guterncontent as any}
              enableGutter={false}
            />
          )}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts<Post>
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              relationTo="posts"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
