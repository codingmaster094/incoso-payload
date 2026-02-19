'use client'

import React, { useState } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface FAQItem {
  question?: string
  answer?: DefaultTypedEditorState
}

export interface NewsContentFaqProps {
  heading?: string
  accordian?: FAQItem[]
}

export const News_Content_Faq: React.FC<NewsContentFaqProps> = ({ heading, accordian }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!accordian?.length) return null

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="space-y-20 xl:space-y-40 mb-8 xl:mb-16">
      {heading && <h2 className="text-38 font-semibold">{heading}</h2>}

      <div className="bg-white max-w-xl mx-auto">
        <ul>
          {accordian.map((item, index) => {
            const isOpen = openIndex === index
            const questionText = item.question ?? ''

            const qId = questionText
              .toLowerCase()
              .replace(/[^\w\s]/gi, '')
              .replace(/\s+/g, '-')

            return (
              <li key={index} className="py-24 not-last:border-b border-stroke2">
                {/* Question */}
                <button onClick={() => toggle(index)} className="w-full font-medium text-left">
                  <div className="flex items-center justify-between font-inter text-22 font-extrabold">
                    <span className="" id={qId}>
                      {item.question}
                    </span>
                    <span>
                      <svg
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
                >
                  {item.answer && (
                    <div className="pt-16">
                      <RichText data={item.answer} />
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
