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
    singular: 'Zwei Geschaftsbereiche',
    plural: 'Zwei Geschaftsbereiche',
  },
  fields: [
    {
      name: 'GeschaftsbereicheHeading',
      type: 'text',
      label: 'Zwei Geschaftsbereiche Heading',
    },
    {
      name: 'boxes',
      type: 'array',
      label: 'Right Left Boxes',
      required: true,
      fields: [
        {
          name: 'Image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
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
          label: 'Description',
        },
      ],
    },
  ],
}
