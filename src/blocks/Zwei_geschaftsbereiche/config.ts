import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Zwei_geschaftsbereiche: Block = {
  slug: 'zwei_geschaftsbereiche',
  imageURL: '/block-previews/Zwei-Geschäftsbereiche.png',
  imageAltText: 'Zwei Geschaftsbereiche preview',
 
  interfaceName: 'zwei_geschaftsbereiche',
  labels: {
    singular: {
      en: "Two business areas",
      de: "Zwei Geschäftsbereiche"
    },
    plural: {
      en: "Two business areas sections",
      de: "Zwei Geschäftsbereiche Sektionen"
    },
  },
  fields: [
    {
      name: 'GeschaftsbereicheHeading',
      type: 'text',
      label: {
        en: "Two business areas Heading",
        de: "Zwei Geschäftsbereiche Überschrift"
      },
    },
    {
      name: 'boxes',
      type: 'array',
      label: {
        en: "Two business areas boxes",
        de: "Zwei Geschäftsbereiche Boxen"
      },
      required: true,
      fields: [
        {
          name: 'Image',
          type: 'upload',
          label: {
            en: "Image",
            de: "Bild"
          },
          relationTo: 'media',
          required: false,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: {
            en:'Heading',
            de:"Überschrift"
          },
        },
        {
          name: 'Description',
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
            en: "Description",
            de: "Beschreibung"
          },
        },
      ],
    },
  ],
}
