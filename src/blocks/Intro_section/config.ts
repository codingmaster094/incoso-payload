import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Intro_section: Block = {
  slug: 'intro_section',
  imageURL: '/block-previews/intro_section.png',
  imageAltText: 'Intro Section',
  labels: {
    singular: {
      en: "Introduction",
      de: "Einleitung"
    },
    plural: {
      en: "Introduction Sections",
      de: "Einleitung Sektionen"
    },
  },

  fields: [
    {
      name: 'main_title',
      type: 'text',
      label: {
        en: "Main Title",
        de: "Haupttitel"
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: {
        en: "Sub Title",
        de: "Untertitel"
      },
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
      label: {
        en: "First Description",
        de: "Erste Beschreibung"
      },
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
      label: {
        en: "Second Description",
        de: "Zweite Beschreibung"
      },
    },
  ],
}
