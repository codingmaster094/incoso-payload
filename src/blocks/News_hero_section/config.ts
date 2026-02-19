import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const News_Hero_Section: Block = {
  slug: 'news_hero_section',
  imageURL: '/block-previews/hero_image.jpg',
  imageAltText: 'News banner',

  labels: {
    singular: 'Hero Image',
    plural: 'Hero Images',
  },

  fields: [
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featuredTag',
      type: 'text',
      label: 'Featured Tag',
    },
    {
      name: 'featuredHeading',
      type: 'text',
      label: 'Featured Heading',
    },
    {
      name: 'featuredcontent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
      label: 'featured Description',
    },
  ],
}
