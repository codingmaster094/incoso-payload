import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
export interface UnsereKulturProps {
  unsere_kulturHeading?: string
  layout?: 'layout1' | 'layout2'
  unsere_kulturimage?: {
    url: string
    alt?: string
  }
  boxHeading1?: string
  unsere_kulturDescription?: DefaultTypedEditorState
  boxHeading2?: string
  boxbutton1?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
  boxbutton2?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
}


export const Unsere_Kultur: React.FC<UnsereKulturProps> = ({
  unsere_kulturHeading,
  unsere_kulturimage,
  boxHeading1,
  unsere_kulturDescription,
  boxHeading2,
  boxbutton1,
  boxbutton2,
  layout = 'layout1',
}) => {
  return (
    <>
      <section className="pb-spc">
        <div className="container">
          {/* Section title */}
          {unsere_kulturHeading && (
            <div className="title">
              <h2>{unsere_kulturHeading}</h2>
            </div>
          )}
          {layout === 'layout1' ? (
            <div className="h_card flex flex-col md:flex-row bg-light">
              {/* Left card */}
              <div className="md:w-1/2">
                {unsere_kulturimage?.url && (
                  <Image
                    src={unsere_kulturimage.url}
                    alt={unsere_kulturimage.alt ?? 'Image'}
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                )}

                <div className="p-20 lg:p-35">
                  {boxHeading1 && (
                    <h3 className="text-22 font-extrabold font-inter mb-18 xl:mb-38">
                      {boxHeading1}
                    </h3>
                  )}

                  {boxbutton1?.label && boxbutton1?.url && (
                    <Link
                      href={boxbutton1.url}
                      target={boxbutton1.target ?? '_self'}
                      className="flex items-center gap-8  w-fit"
                    >
                      <span>{boxbutton1.label}</span>
                      <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Right card */}
              <div className="md:w-1/2 p-20 lg:p-35 flex flex-col justify-between">
                <div>
                  {boxHeading2 && (
                    <h3 className="text-22 font-extrabold font-inter mb-18 xl:mb-38">
                      {boxHeading2}
                    </h3>
                  )}

                  {unsere_kulturDescription && (
                    <div className="text mb-18 xl:mb-36">
                      <RichText data={unsere_kulturDescription} />
                    </div>
                  )}
                </div>

                {boxbutton2?.label && boxbutton2?.url && (
                  <Link
                    href={boxbutton2.url}
                    target={boxbutton2.target ?? '_self'}
                    className="flex items-center gap-8 w-fit"
                  >
                    <span>{boxbutton2.label}</span>
                    <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          {layout === 'layout2' ? (
            <div className="h_card flex flex-col md:flex-row gap-14 xl:gap-76">
              <div className="md:w-1/2 bg-light">
                {unsere_kulturimage?.url && (
                  <Image
                    src={unsere_kulturimage.url}
                    alt={unsere_kulturimage.alt ?? 'Image'}
                    width={800}
                    height={600}
                    className="w-full"
                  />
                )}

                <div className="p-20 lg:p-35">
                  {boxHeading1 && (
                    <h3 className="text-22 font-extrabold font-inter mb-18 xl:mb-38">
                      {boxHeading1}
                    </h3>
                  )}
                  {boxbutton1?.label && boxbutton1?.url && (
                    <Link
                      href={boxbutton1.url}
                      target={boxbutton1.target ?? '_self'}
                      className="flex items-center gap-8 w-fit"
                    >
                      <span>{boxbutton1.label}</span>
                      <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
                    </Link>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 bg-light p-20 lg:p-35 flex flex-col justify-between">
                <div>
                  {boxHeading2 && (
                    <h3 className="text-22 font-extrabold font-inter mb-18 xl:mb-38">
                      {boxHeading2}
                    </h3>
                  )}

                  {unsere_kulturDescription && (
                    <div className="text "><RichText data={unsere_kulturDescription} /></div>
                  )}
                </div>
                {boxbutton2?.label && boxbutton2?.url && (
                  <Link
                    href={boxbutton2.url}
                    target={boxbutton2.target ?? '_self'}
                    className="flex items-center gap-8 w-fit"
                  >
                    <span>{boxbutton2.label}</span>
                    <Image src="/image/right-arrow-icon.svg" alt="Arrow" width={16} height={16} />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  )
}
