// News_content_Kosten.ts

import { Block } from "payload";

export const News_content_Kosten: Block = {
  slug: 'news_content_kosten',
  interfaceName: 'NewsContentKostenBlock',
  labels: {
    singular: 'News Content Kosten',
    plural: 'News Content Kosten',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'boxes',
      type: 'array',
      label: 'Kosten Items',
      fields: [
        {
          name: 'Kosten_boxesimage',
          type: 'upload',
          label: 'Kosten Boxes Image',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'Kosten_heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'Kosten_sub_heading',
          type: 'text',
          label: 'Sub Heading',
        },
        {
          name: 'boxbutton',
          type: 'group',
          label: 'Button',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Box Button Label',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Box Button Url',
            },
            {
              name: 'target',
              type: 'select',
              label: 'Box Button Target',
              options: [
                { label: 'Same Tab', value: '_self' },
                { label: 'New Tab', value: '_blank' },
              ],
              defaultValue: '_self',
            },
          ],
        },
      ],
    },
  ],
}
