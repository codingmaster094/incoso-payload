import Image from 'next/image'
import React from 'react'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
export interface ZweiGeschaftsbereicheProps {
  GeschaftsbereicheHeading?: string
  boxes?: Array<{
    Image?: {
      url: string
      alt?: string
    }
    heading?: string
    Description?: DefaultTypedEditorState
  }>
}

export const Zwei_geschaftsbereiche: React.FC<ZweiGeschaftsbereicheProps> = ({
  GeschaftsbereicheHeading,
  boxes,
}) => {
  if (!boxes?.length) return null

  return (
    <section className="pb-spc">
      <div className="container">
        {/* Section heading */}
        {GeschaftsbereicheHeading && (
          <div className="title">
            <h2>{GeschaftsbereicheHeading}</h2>
          </div>
        )}

        {/* Boxes */}
        <div className="space-y-14 xl:space-y-28 max-w-1040">
          {boxes.map((box, index) => (
            <div key={index} className="flex gap-20">
              {/* Icon / Image */}
              {box.Image?.url && <Image src={box.Image.url} alt={box.Image.alt ?? 'Icon'} width={56} height={56} />}

              {/* Content */}
              <div className="space-y-9">
                {box.heading && <h3 className="font-bold">{box.heading}</h3>}

                {box.Description && <RichText data={box.Description} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
