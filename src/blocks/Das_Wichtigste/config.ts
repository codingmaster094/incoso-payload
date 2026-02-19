
import { Block } from 'payload'

export const Das_Wichtigste: Block = {
  slug: 'das_wichtigste',
  imageURL: '/block-previews/Unsere-Commodities.png',
  imageAltText: 'Das Wichtigste',
 
  interfaceName: 'Das Wichtigste',
  labels: {
    singular: 'Das Wichtigste',
    plural: 'Das Wichtigste',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Heading', 
    },
    {
      name: 'ul_items',
      type: 'array',
      label: 'Right Left Boxes',
      required: false,
      fields: [ 
        {
          name: 'title',
          type: 'text',
          required: false,
          label: 'li item',
        },
        
      ],
    },
  ],
}
