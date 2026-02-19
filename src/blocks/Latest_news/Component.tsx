import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { News } from '@/payload-types'
import dayjs from 'dayjs';
export type LatestNewsBlockProps = {
  heading?: string | null
  button?: {
    label?: string | null
    url?: string | null
    target?: string | null
  } | null
  news?: (News | string)[] | null
}

export const Latestnews: React.FC<LatestNewsBlockProps> = ({ heading, news, button }) => {
  if (!news || news.length === 0) return null
  return (
    <section className="pb-spc">
      <div className="container">
        <div className="title">{heading && <h2>{heading}</h2>}</div>
        <div className="latest_news grid md:grid-cols-2 lg:grid-cols-3 gap-14 xl:gap-35 text-xs mb-24 lg:mb-38">
          {[...(news || [])]
            .sort((a, b) => {
              if (typeof a === 'string' || typeof b === 'string') return 0
              return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
            })
            .map((item, index) => {
              if (typeof item === 'string') return null
              const heroImage = item.heroImage
              const isMedia =
                typeof heroImage === 'object' && heroImage !== null && 'url' in heroImage
              const imgSrc = isMedia ? heroImage.url! : '/placeholder-image.jpg'
              const imgAlt = isMedia ? heroImage.alt || 'Default Alt Text' : 'Default Alt Text'
              const publishedDate = item.publishedAt ? dayjs(item.publishedAt).format('DD.MM.YYYY') : '';

              return (
                <div key={index} className="bg-light rounded-[14px] overflow-hidden flex flex-col">
                  {item.slug ? (
                    <Link href={`/news/${item.slug}`} className="img">
                      <Image className="w-full" src={imgSrc} alt={imgAlt} width={377} height={282} />
                    </Link>
                  ) : (
                    <Image className="w-full" src={imgSrc} alt={imgAlt} width={377} height={282} />
                  )}
                  <div className="px-20 py-28 flex flex-col gap-9 grow">
                    <span className="text-xs">{item.in_focus}</span>
                    <Link
                      href={item.slug ? `/news/${item.slug}` : ''}
                      className="font-semibold text-base xl:text-lg"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-auto inline-block">{publishedDate}</p>
                  </div>
                </div>
              )
            })}
        </div>

        {button?.url && (
          <Link
            href={button.url}
            target={button.target || '_self'}
            className="flex items-center gap-8 w-fit "
          >
            <span>{button.label}</span>
            <Image src="/image/right-arrow-icon.svg" alt="" className="" width={16} height={16} />
          </Link>
        )}
      </div>
    </section>
  )
}
