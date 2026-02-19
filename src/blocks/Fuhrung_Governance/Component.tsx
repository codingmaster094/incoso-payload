import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
export interface FuhrungGovernanceProps {
  boxes?: Array<{
    heading?: string
    boxDescription?: DefaultTypedEditorState
    boxbutton?: {
      label?: string
      url?: string
      target?: '_self' | '_blank'
    }
  }>
}




export const Fuhrung_Governance: React.FC<FuhrungGovernanceProps> = ({ boxes }) => {
  if (!boxes?.length) return null

  return (
    <section className="pb-spc">
      <div className="container">
        <div className="h_card flex flex-col md:flex-row gap-14 xl:gap-76">
          {boxes.map((box, index) => (
            <div
              key={index}
              className="md:w-1/2 bg-light p-20 lg:p-35 flex flex-col justify-between"
            >
              <div>
                {box.heading && (
                  <h3 className="text-22 font-extrabold font-inter mb-18 xl:mb-38">
                    {box.heading}
                  </h3>
                )}

                {box.boxDescription && (
                  <div className="text"><RichText data={box.boxDescription} /></div>
                )}
              </div>

              {box.boxbutton?.label && box.boxbutton?.url && (
                <Link
                  href={box.boxbutton.url}
                  target={box.boxbutton.target ?? '_self'}
                  className="flex items-center gap-8 mt-20 w-fit"
                >
                  <span>{box.boxbutton.label}</span>
                  <Image
                    src="/image/right-arrow-icon.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
