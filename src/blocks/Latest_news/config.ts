
import { Block } from 'payload'

export const Latest_news: Block = {
  slug: 'latest_news',
  imageURL: '/block-previews/Latest-news.png',
  imageAltText: 'Latest News preview',

  interfaceName: 'LatestNewsBlock',
  labels: {
    singular: 'Aktuelle Nachrichten',
    plural: 'Aktuelle Nachrichten',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Main Heading',
    },

    {
      name: 'news',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      required: true,
      maxRows: 3,
      label: 'Select Latest News',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button Url',
        },
        {
          name: 'target',
          type: 'select',
          label: 'Button Target',
          options: [
            { label: 'Same Tab', value: '_self' },
            { label: 'New Tab', value: '_blank' },
          ],
          defaultValue: '_self',
        },
      ],
    },

  ],
}
