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
    singular: {
      en: "Hero Image",
      de: "Hero-Bild"
    },
    plural: {
      en: "Hero Images",
      de: "Hero-Bilder"
    },
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
      label: {
        en: "Featured Tag",
        de: "Vorgestellter Tag"
      },
    },
    {
      name: 'featuredHeading',
      type: 'text',
      label: {
        en: "Featured Heading",
        de: "Vorgestellte Überschrift"
      },
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
      label: {
        en: "Featured Description",
        de: "Vorgestellte Beschreibung"
      },
    },
  ],
}
