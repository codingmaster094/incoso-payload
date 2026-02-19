import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Was_Wir_Tun: Block = {
  slug: 'was_wir_tun',
  imageURL: '/block-previews/Was_wir_tun.png',
  imageAltText: 'Was Wir Tun',
  interfaceName: 'WasWirTunBlock',
  labels: {
    singular: 'Was Wir Tun Section',
    plural: 'Was Wir Tun Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Main Heading',
    },
    {
      name: 'boxes',
      type: 'array',
      label: 'Was Wir Tun Boxes',
      required: false,
      fields: [
        {
          name: 'was_wir_tunimage',
          type: 'upload',
          label: 'Was Wir Tun Image',
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
