import React from 'react'
import Image from 'next/image'

interface News_Kurvige_Lifte {
  heroImage?: {
    url: string
    alt?: string
  }
  title: string
}

export const News_Kurvige_Lifte: React.FC<News_Kurvige_Lifte> = ({ heroImage, title }) => {
  return (
    <div className="bg-light text-center p-16 sm:p-20 md:p-40 xl:p-64 space-y-12 xl:space-y-24">
      <h3 className="text-22 font-extrabold font-inter">{title}</h3>
      {typeof heroImage === 'object' && heroImage?.url && (
        <Image src={heroImage?.url} alt="" className="mx-auto" width={412} height={618} />
      )}
    </div>
  )
}
