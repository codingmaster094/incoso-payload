
import { Block } from 'payload'

export const Das_Wichtigste: Block = {
  slug: 'das_wichtigste',
  imageURL: '/block-previews/Unsere-Commodities.png',
  imageAltText: 'Das Wichtigste',
 
  interfaceName: 'Das Wichtigste',
  labels: {
    singular: {
      en: "Das Wichtigste",
      de: "Das Wichtigste"
    },
    plural: {
      en: "Das Wichtigste",
      de: "Das Wichtigste"
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: {
        en: "Heading",
        de: "Überschrift"
      }, 
    },
    {
      name: 'ul_items',
      type: 'array',
      label: {
        en: "Right Left Boxes",
        de: "Rechts Links Boxen"
      },
      required: false,
      fields: [ 
        {
          name: 'title',
          type: 'text',
          required: false,
          label: {
            en: "li item",
            de: "li Element"
          },
        },
        
      ],
    },
  ],
}
