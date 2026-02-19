import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Post, News } from '@/payload-types'
import { Card } from '../../components/Card'

/* ----------------------------------------
   Shared base type
---------------------------------------- */
type RelatedDoc = Post | News

export type RelatedPostsProps<T extends RelatedDoc> = {
  className?: string
  docs?: T[]
  introContent?: DefaultTypedEditorState
  relationTo: 'posts' | 'news'
}

export const RelatedPosts = <T extends RelatedDoc>(
  props: RelatedPostsProps<T>,
) => {
  const { className, docs, introContent, relationTo } = props

  if (!docs || docs.length === 0) return null

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && (
        <RichText data={introContent} enableGutter={false} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {[...(docs || [])]
            .sort((a, b) => {
              if (typeof a === 'string' || typeof b === 'string') return 0
              return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
            }).map((doc) => {
          if (typeof doc === 'string') return null

          return (
            <Card
              key={doc.id}
              doc={doc}
              relationTo={relationTo}
              showCategories
            />
          )
        })}
      </div>
    </div>
  )
}
