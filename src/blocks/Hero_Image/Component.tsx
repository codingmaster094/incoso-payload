import React from 'react'
import Image from 'next/image'

interface HeroImageProps {
  heroImage?: {
    url: string
    alt?: string
  }
  title: string
}

export const Hero_Image: React.FC<HeroImageProps> = ({ heroImage, title }) => {
  return (
    <section className="mb-spc relative z-1 lg:min-h-[calc(100dvh-100px)] flex items-center py-150 bg-black">
      <div className="absolute inset-0 -z-1">
        {heroImage?.url && (
          <Image
            src={heroImage?.url}
            className="size-full object-cover"
            alt={heroImage?.alt || 'Hero background image'}
            width={1920}
            height={553}
            priority={true}
          />
        )}
      </div>
      {title && (
        <h1 className="container text-38 text-white font-semibold z-10">{title}</h1>
      )}
    </section>
  )
}
