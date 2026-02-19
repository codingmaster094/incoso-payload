import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

/* -------------------- Props -------------------- */

interface UnserAnsatzProps {
  Heading?: string
  description?: DefaultTypedEditorState
  boxHeading?: string
  boxdescription?: DefaultTypedEditorState
  boxbutton?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
  boximage?: {
    url: string
    alt?: string
  }
}

/* -------------------- Component -------------------- */

export const Unser_ansatz: React.FC<UnserAnsatzProps> = ({
  Heading,
  description,
  boxHeading,
  boxdescription,
  boxbutton,
  boximage,
}) => {
  return (
    <section className="pb-spc">
      <div className="container">
        {/* -------- Top Heading -------- */}
        {(Heading || description) && (
          <div className="title">
            {Heading && <h1>{Heading}</h1>}
            {description && <RichText data={description} />}
          </div>
        )}

        {/* -------- Content Card -------- */}
        <div className="h_card flex flex-col md:flex-row bg-light">
          {/* Left */}
          <div className="md:w-1/2 p-20 lg:p-60 flex flex-col justify-center">
            {boxHeading && (
              <h2 className="text-38 font-semibold pb-20 xl:pb-40 underlined">{boxHeading}</h2>
            )}

            {boxdescription && (
              <div className="text mb-18 xl:mb-36"><RichText data={boxdescription} /></div>
            )}

            {boxbutton?.label && boxbutton?.url && (
              <Link
                href={boxbutton.url}
                target={boxbutton.target ?? '_self'}
                className="flex items-center gap-8 w-fit"
              >
                <span>{boxbutton.label}</span>
                <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
              </Link>
            )}
          </div>

          {/* Right Image */}
          {boximage?.url && (
            <div className="md:w-1/2 aspect-[1.17/1] relative min-h-full max-w-full">
              <Image
                src={boximage.url}
                alt={boximage.alt ?? 'Image'}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
