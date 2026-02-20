
import { Block } from 'payload'

export const Latest_news: Block = {
  slug: 'latest_news',
  imageURL: '/block-previews/Latest-news.png',
  imageAltText: 'Latest News preview',

  interfaceName: 'LatestNewsBlock',
  labels: {
    singular: {
      en: "Latest News",
      de: "Aktuelle Nachrichten"
    },
    plural: {
      en: "Latest News",
      de: "Aktuelle Nachrichten"
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: {
        en: "Main Heading",
        de: "Hauptüberschrift"
      },
    },

    {
      name: 'news',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      required: true,
      maxRows: 3,
      label: {
        en: "Select Latest News",
        de: "Aktuelle Nachrichten auswählen"
      },
    },
    {
      name: 'button',
      type: 'group',
      label: {
        en: "Button",
        de: "Knopf"
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: "Button Label",
            de: "Knopf Beschriftung"
          },
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: "Button Url",
            de: "Knopf Url"
          },
        },
        {
          name: 'target',
          type: 'select',
          label: {
            en: "Button Target",
            de: "Knopf Ziel"
          },
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
