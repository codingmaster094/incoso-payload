import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Unsere_Kultur: Block = {
  slug: 'unsere_kultur',
  imageURL: '/block-previews/Unsere-Kultur.png',
  imageAltText: 'Unsere Kultur preview',
 
  interfaceName: 'unsere_kultur',
  labels: {
    singular: 'Unsere Kultur',
    plural: 'Unsere Kulturen',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'layout',
      defaultValue: 'layout1',
      options: [
        { label: 'Layout 1', value: 'layout1' },
        { label: 'Layout 2', value: 'layout2' },
      ],
    },

    {
      name: 'unsere_kulturHeading',
      type: 'text',
      label: 'Unsere Kulturen Heading',
    },
    {
      name: 'unsere_kulturimage',
      type: 'upload',
      label: 'Unsere Kulturen Image',
      relationTo: 'media',
      required: false,
    },

    {
      name: 'boxHeading1',
      type: 'text',
      label: 'Box Heading 1',
    },
    {
      name: 'unsere_kulturDescription',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
      label: 'Unsere Kulturen Description',
    },
    {
      name: 'boxHeading2',
      type: 'text',
      label: 'Box Heading 2',
    },
    {
      name: 'boxbutton1',
      type: 'group',
      label: 'Button 1',
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
      name: 'boxbutton2',
      type: 'group',
      label: 'Button 2',
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
  ],
}
