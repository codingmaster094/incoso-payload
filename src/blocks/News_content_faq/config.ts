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
    singular: 'News Content FAQ',
    plural: 'News Content FAQ',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'accordian',
      type: 'array',
      label: 'FAQ Items',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
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
          label: 'Answer',
        },
      ],
    },
  ],
}
