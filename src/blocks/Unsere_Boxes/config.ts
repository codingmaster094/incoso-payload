import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Unsere_Boxes: Block = {
  slug: 'unsere_boxes',
  imageURL: '/block-previews/Unsere-Commodities.png',
  imageAltText: 'Unsere Boxes preview',
 
  interfaceName: 'UnsereBoxesBlock',
  labels: {
    singular: 'Unsere Boxes Section',
    plural: 'Unsere Boxes Sections',
  },
  fields: [
    {
      name: 'boxes',
      type: 'array',
      label: 'Right Left Boxes',
      required: false,
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'right',
          options: [
            { label: 'Image Right', value: 'right' },
            { label: 'Image Left', value: 'left' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: false,
          label: 'Main Box Title',
        },
        {
          name: 'unsere_boxesimage',
          type: 'upload',
          label: 'Unsere Boxes Image',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'heading',
          type: 'text',
          required: false,
          label: 'Heading',
        },
        {
          name: 'boxDescription',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            ],
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
      ],
    },
  ],
}
