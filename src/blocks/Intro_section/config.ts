import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Intro_section: Block = {
  slug: 'intro_section',
  imageURL: '/block-previews/intro_section.png',
  imageAltText: 'Intro Section',
  labels: {
    singular: 'Einleitung',
    plural: 'Einleitung',
  },

  fields: [
    {
      name: 'main_title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sub Title',
    },
    {
      name: 'description1',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
      label: 'First Description',
    },
    {
      name: 'description2',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
      label: 'Second Description',
    },
  ],
}
