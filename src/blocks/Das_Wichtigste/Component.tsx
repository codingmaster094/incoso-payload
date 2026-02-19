import React from 'react'

export interface Das_WichtigsteBlockProps {
  heading?: string
  ul_items?: Array<{
    title?: string
  }>
}

export const Das_Wichtigste: React.FC<Das_WichtigsteBlockProps> = ({ heading, ul_items }) => {
  if (!ul_items?.length) return null

  return (
    <>
      <div className="bg-light p-24 border-l-4 mb-8 xl:mb-16">
        <span className="inline-block text-22 font-extrabold mb-12">{heading}</span>
        <ul className="list-disc list-inside space-y-4">
          {ul_items && ul_items.map((item, index) => <li key={index}>{item.title}</li>)}
        </ul>
      </div>
      
    </>
  )
}
