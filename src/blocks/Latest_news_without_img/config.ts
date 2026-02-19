import { Block } from 'payload'

export const Latest_news_without_img: Block = {
  slug: 'latest_news_without_img',
  imageURL: '/block-previews/news_without_img.png',
  imageAltText: 'Latest News Without Image',
  interfaceName: 'LatestNewsWithoutImgBlock',
  labels: {
    singular: 'Aktuelle Nachrichten Ohne Bild',
    plural: 'Aktuelle Nachrichten Ohne Bild',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Main Heading',
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
    {
      name: 'news',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      required: true,
      maxRows: 3,
      label: 'Select Latest News',
    },
  ],
}
