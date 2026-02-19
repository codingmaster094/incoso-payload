import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface boxesItem {
  Kosten_heading?: string
  Kosten_sub_heading?: string
  Kosten_boxesimage?: {
    url: string
    alt?: string
  }
  boxbutton?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
}

export interface NewsContentKostenProps {
  heading?: string
  boxes?: boxesItem[]
}

export const News_Content_Kosten: React.FC<NewsContentKostenProps> = ({ heading, boxes }) => {
  if (!boxes?.length) return null

  return (
    <div className="space-y-16 xl:space-y-32">
      <h2 className="text-38 font-semibold">{heading}</h2>
      <div className="latest_news grid md:grid-cols-2 gap-14 xl:gap-35">
        {boxes.map((item, index) => {
          return (
            <div key={index} className="bg-light rounded-[14px] overflow-hidden flex flex-col">
              {item.boxbutton?.label && item.boxbutton?.url && (
                <Link
                  href={item.boxbutton.url}
                  target={item.boxbutton.target ?? '_self'}
                  className="img"
                  aria-label="Neueste Nachrichten 1"
                >
                  {item.Kosten_boxesimage?.url && (
                    <Image
                      className="w-full"
                      src={item.Kosten_boxesimage?.url}
                      alt=""
                      width={377}
                      height={282}
                    />
                  )}
                </Link>
              )}
              <div className="p-20 grow">
                {item.boxbutton?.label && item.boxbutton?.url && (
                  <Link
                    href={item.boxbutton.url}
                    target={item.boxbutton.target ?? '_self'}
                    className="block font-semibold text-base xl:text-lg mb-10 xl:mb-20"
                    aria-label="Neueste Nachrichten 1"
                  >
                    {item.Kosten_heading}
                  </Link>
                )}

                <span className="inline-block mt-auto mb-10 xl:mb-20">
                  {item.Kosten_sub_heading}
                </span>
                {item.boxbutton?.label && item.boxbutton?.url && (
                  <Link
                    href={item.boxbutton.url}
                    target={item.boxbutton.target ?? '_self'}
                    className="flex items-center gap-8 w-fit mx-auto"
                    aria-label="Neueste Nachrichten 1"
                  >
                    <span> {item.boxbutton?.label}</span>
                    <Image src="/image/right-arrow-icon.svg" alt="" width={16} height={16} />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
