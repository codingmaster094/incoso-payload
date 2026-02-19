import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Unser_ansatz: Block = {
  slug: 'unser_ansatz',
  imageURL: '/block-previews/Unser-Ansatz.png',
  imageAltText: 'Unser Ansatz preview',
 
  interfaceName: 'unser_ansatz',
  labels: {
    singular: 'Unser Ansatz',
    plural: 'Unser Ansatz',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    {
      name: 'boxHeading',
      type: 'text',
      label: 'Box Heading',
    },
    {
      name: 'boxdescription',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Box Description',
    },
    {
      name: 'boxbutton',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Box Button Label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Box Button Url',
        },
        {
          name: 'target',
          type: 'select',
          label: 'Box Button Target',
          options: [
            { label: 'Same Tab', value: '_self' },
            { label: 'New Tab', value: '_blank' },
          ],
          defaultValue: '_self',
        },
      ],
    },
    {
      name: 'boximage',
      type: 'upload',
      label: 'Box Image',
      relationTo: 'media',
      required: false,
    },
  ],
}
