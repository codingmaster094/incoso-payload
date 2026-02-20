// News_content_faq.ts
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const News_content_faq: Block = {
  slug: 'news_content_faq',
  interfaceName: 'NewsContentFaqBlock',
  labels: {
    singular: {
      en: "News Content FAQ",
      de: "Nachrichten Inhalt FAQ"
    },
    plural: {
      en: "News Content FAQ",
      de: "Nachrichten Inhalt FAQ"
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
      name: 'accordian',
      type: 'array',
      label: {
        en:'FAQ Items',
        de:'Häufig gestellte Fragen'
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: {
            en:'Question',
            de:'Frage'
          },
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            ],
          }),
          label: {
            en:'Answer',
            de:'Antwort'
          },
        },
      ],
    },
  ],
}
