import React from 'react'
import Image from 'next/image'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

export interface NewsCTA {
  heading?: string
  content?: DefaultTypedEditorState
  button?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
}

export const NEWS_CTA: React.FC<NewsCTA> = ({ heading, content, button }) => {
  return (
    <div className="bg-light px-26 py-64 text-center flex flex-col gap-12 xl:gap-24 mb-8 xl:mb-16">
      <h3 className="text-38 font-semibold">{heading}</h3>
      {content && <RichText data={content} />}
      {button?.label && button?.url && (
        <Link
          href={button.url}
          target={button.target ?? '_self'}
          className="flex items-center gap-8 w-fit mx-auto "
        >
          <span>{button?.label}</span>
          <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
        </Link>
      )}
    </div>
  )
}
