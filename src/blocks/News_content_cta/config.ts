import { FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const News_content_CTA: Block = {
  slug: 'news_content_cta',
  labels: {
    singular: {
      en: "News CTA",
      de: "Nachrichten CTA"
    },
    plural: {
      en: "News CTA",
      de: "Nachrichten CTA"
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
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
      required: false,
    },
    {
      name: 'button',
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
}
