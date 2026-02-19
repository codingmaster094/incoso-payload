import React from 'react'
import Link from 'next/link'
import { News } from '@/payload-types'
import dayjs from 'dayjs'
export interface Was_Wir_TunBlockProps {
  heading?: string
  boxbutton?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
  news?: News[]
}

export const Latest_news_without_img: React.FC<Was_Wir_TunBlockProps> = ({
  heading,
  boxbutton,
  news,
}) => {

  if (!news || news.length === 0) return null
  return (
    <>
      <section className="pb-spc">
        <div className="container">
          <div className="title">{heading && <h2>{heading}</h2>}</div>
          <div className="latest_news grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-14 text-sm">
            {news.map((item, index) => {
              const publishedDate = item?.publishedAt
                ? dayjs(item.publishedAt).format('DD.MM.YYYY')
                : ''
              return (
                <div key={index} className="bg-light px-17 py-32 flex flex-col gap-12">
                  <span className="text-xs">{publishedDate}</span>
                  <h3 className="font-semibold">{item?.title}</h3>
                  <Link href={`/news/${item.slug}`} role='link' className='mt-auto hover:text-green'>Mehr erfahren</Link>
                </div>
              )
            })}
          </div>
          {boxbutton?.label && boxbutton?.url && (
            <Link
              href={boxbutton.url}
              target={boxbutton.target ?? '_self'}
              className="mt-40 inline-block underline"
            >
              <span>{boxbutton.label}</span>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
