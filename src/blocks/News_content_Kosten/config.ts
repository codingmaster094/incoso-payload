// News_content_Kosten.ts

import { Block } from "payload";

export const News_content_Kosten: Block = {
  slug: 'news_content_kosten',
  interfaceName: 'NewsContentKostenBlock',
  labels: {
    singular: {
      en: "News Content Kosten",
      de: "Nachrichten Inhalt Kosten"
    },
    plural: {
      en: "News Content Kosten",
      de: "Nachrichten Inhalt Kosten"
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: {
        en:'Title',
        de:'Titel'
      },
    },
    {
      name: 'boxes',
      type: 'array',
      label: {
        en:'Kosten Items',
        de:'Kosten Items'
      },
      fields: [
        {
          name: 'Kosten_boxesimage',
          type: 'upload',
          label: {
            en:'Kosten Boxes Image',
            de:'Kosten Boxes Image'
          },
          relationTo: 'media',
          required: false,
        },
        {
          name: 'Kosten_heading',
          type: 'text',
          label: {
            en:'Heading',
            de:'Überschrift'
          },
        },
        {
          name: 'Kosten_sub_heading',
          type: 'text',
          label: {
            en:'Sub Heading',
            de:'Unterüberschrift'
          },
        },
        {
          name: 'boxbutton',
          type: 'group',
          label: {
            en:'Button',
            de:'Knopf'
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: {
                en:'Button Label',
                de:'Knopf Beschriftung'
              },
            },
            {
              name: 'url',
              type: 'text',
              label: {
                en:'Button Url',
                de:'Knopf Url'
              },
            },
            {
              name: 'target',
              type: 'select',
              label: {
                en:'Button Target',
                de:'Knopf Ziel'
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
    },
  ],
}
