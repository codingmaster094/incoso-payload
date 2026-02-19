import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
export interface UnsereBoxesBlockProps {
  boxes?: Array<{
    layout?: 'left' | 'right'
    title?: string
    heading?: string
    boxDescription?: DefaultTypedEditorState
    unsere_boxesimage?: {
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



export const Unsere_Boxes: React.FC<UnsereBoxesBlockProps> = ({ boxes }) => {
  if (!boxes?.length) return null

  return (
    <>
      {boxes.map((box, index) => {
        const isReverse = box.layout === 'left'
        // even = image right, odd = image left

        return (
          <section key={index} className="pb-spc">
            <div className="container">
              {box.title && (
                <div className="title">
                  <h2>{box.title}</h2>
                </div>
              )}

              {/* Card */}
              <div
                className={`h_card flex flex-col md:flex-row bg-light ${
                  isReverse ? 'reverse' : ''
                }`}
              >
                {/* Text */}
                <div className="md:w-1/2 p-20 lg:p-60 flex flex-col justify-center">
                  {box.heading && (
                    <h2 className="text-38 font-semibold pb-20 xl:pb-40">{box.heading}</h2>
                  )}

                  {box.boxDescription && (
                    <div className="text mb-18 xl:mb-36"><RichText data={box.boxDescription} /></div>
                  )}

                  {box.boxbutton?.label && box.boxbutton?.url && (
                    <Link
                      href={box.boxbutton.url}
                      target={box.boxbutton.target ?? '_self'}
                      className="flex items-center gap-8 w-fit"
                    >
                      <span>{box.boxbutton.label}</span>
                      <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
                    </Link>
                  )}
                </div>

                {/* Image */}
                {box.unsere_boxesimage?.url && (
                  <div className="md:w-1/2 aspect-[1.17/1] relative min-h-full max-w-full">
                    <Image
                      src={box.unsere_boxesimage.url}
                      alt={box.unsere_boxesimage.alt ?? 'Image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
