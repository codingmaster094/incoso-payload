import React from 'react'
import Image from 'next/image'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface NewsHeroSectionData {
  featuredImage?: {
    url: string
    alt?: string
  }
  featuredTag: string
  featuredHeading: string
  featuredcontent: DefaultTypedEditorState
}

export const News_Hero_section: React.FC<NewsHeroSectionData> = ({
  featuredImage,
  featuredTag,
  featuredHeading,
  featuredcontent,
}) => {
  return (
    <section className="py-spc">
      <div className="container">
        <div className="not-md:flex-col flex items-center justify-between gap-48">
          <div className="md:w-6/12 xl:w-5/12">
            <span className="inline-block mb-8">{featuredTag}</span>
            <h1 className="mb-12 xl:mb-24 text-38 font-semibold">{featuredHeading}</h1>
            <RichText data={featuredcontent} />
          </div>
          <div className="md:w-6/12 xl:w-9/12 aspect-[1.44/1]">
            {featuredImage?.url ? (
              <Image
                src={featuredImage?.url}
                alt=""
                className="size-full object-cover"
                width={743}
                height={516}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
