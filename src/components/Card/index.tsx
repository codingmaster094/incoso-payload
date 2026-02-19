'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { News, Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage' | 'publishedAt'>
export type CardDoc = Post | News | 'posts' | 'news'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: CardDoc
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, heroImage, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const imageToUse = heroImage || metaImage

  return (
    <article
      className={cn(
        'bg-light rounded-[14px] overflow-hidden flex flex-col',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-video">
        {!imageToUse && <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No image</div>}
        {imageToUse && typeof imageToUse !== 'string' && (
          <Media resource={imageToUse} size="33vw" fill imgClassName="object-cover" />
        )}
      </div>
      <div className="px-20 py-28 flex flex-col gap-9 grow bg-light rounded-[14px] overflow-hidden flex flex-col">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose mb-2">
            <h3 className='font-semibold text-base xl:text-lg'>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {publishedAt && (
          <div className="mt-auto inline-block">
            {new Date(publishedAt).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
        )}
      </div>
    </article>
  )
}
