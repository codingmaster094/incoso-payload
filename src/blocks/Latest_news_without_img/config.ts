import { Block } from 'payload'

export const Latest_news_without_img: Block = {
  slug: 'latest_news_without_img',
  imageURL: '/block-previews/news_without_img.png',
  imageAltText: 'Latest News Without Image',
  interfaceName: 'LatestNewsWithoutImgBlock',
  labels: {
    singular: {
      en: "Latest News Without Image",
      de: "Aktuelle Nachrichten Ohne Bild"
    },
    plural: {
      en: "Latest News Without Image",
      de: "Aktuelle Nachrichten Ohne Bild"
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
      name: 'boxbutton',
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
  ],
}
