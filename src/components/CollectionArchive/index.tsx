'use client'

import { cn } from '@/utilities/ui'
import React, { useMemo, useState } from 'react'
import { Card, CardPostData } from '@/components/Card'

export type Props = {
  news?: CardPostData[]
  posts?: CardPostData[]
  relationTo?: 'posts' | 'news'
}
export const CollectionArchive: React.FC<Props> = ({ news, posts, relationTo = 'posts' }) => {
  const [visibleCount, setVisibleCount] = useState(3)

  // Normalize data
  const data = useMemo(() => {
    const source = relationTo === 'news' ? news : posts

    if (!source || !Array.isArray(source)) return []

    return source
      .filter((item): item is CardPostData => typeof item === 'object' && item !== null)
      .sort(
        (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime(),
      )
  }, [news, posts, relationTo])

  const visibleItems = data.slice(0, visibleCount)

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-8">
        {visibleItems.map((item, index) => (
          <div className="col-span-4" key={index}>
            <Card className="h-full" doc={item} relationTo={relationTo} showCategories />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setVisibleCount((prev) => Math.min(prev + 3, data.length))}
        className="p-16 my-8 bg-black text-white transition-opacity"
      >
        Mehr laden
      </button>
    </div>
  )
}
