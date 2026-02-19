import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

export interface Was_Wir_TunBlockProps {
  boxes?: Array<{
    heading?: string
    boxDescription?: DefaultTypedEditorState
    was_wir_tunimage?: {
      url: string
      alt?: string
    }
    boxbutton?: {
      label?: string
      url?: string
      target?: '_self' | '_blank'
    }
  }>
}

/* -------------------- */
/* Main Component */
/* -------------------- */
export const Was_Wir_Tun: React.FC<Was_Wir_TunBlockProps> = ({ boxes }) => {
  if (!boxes?.length) return null

  return (
    <section className="pb-spc">
      <div className="container">
        <div className="title">
          <h2>Was wir tun</h2>
        </div>

        <div className="latest_news grid md:grid-cols-2 gap-14 lg:gap-40 xl:gap-80 text-white">
          {boxes.map((box, index) => {
            const imageUrl = box.was_wir_tunimage?.url
            const imageAlt = box.was_wir_tunimage?.alt || box.heading || 'Image'

            return (
              <div
                key={index}
                className="relative z-1 bg-black rounded-[14px] overflow-hidden flex flex-col p-20 xsm:p-40 xl:px-75 xl:py-130"
              >
                {imageUrl && (
                  <div className="img absolute -z-2 inset-0">
                    <Image
                      className="size-full object-cover"
                      src={imageUrl}
                      alt={imageAlt}
                      width={560}
                      height={470}
                    />
                  </div>
                )}

                {box.heading && (
                  <h3 className="text-22 font-extrabold font-inter mb-9 xl:mb-18">{box.heading}</h3>
                )}
                {box.boxDescription && <RichText data={box.boxDescription} />}

                {box.boxbutton?.url && (
                  <Link
                    href={box.boxbutton.url}
                    target={box.boxbutton.target || '_self'}
                    className="flex items-center gap-8 font-bold w-fit"
                  >
                    <span>{box.boxbutton.label || 'Mehr Erfahren'}</span>
                    <Image
                      src="/image/right-arrow-icon.svg"
                      alt="Arrow"
                      className="invert"
                      width={16}
                      height={16}
                    />
                  </Link>
                )}

                <div className="overlay -z-1 absolute inset-0 bg-black/50"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
