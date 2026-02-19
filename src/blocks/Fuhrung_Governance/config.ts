import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Fuhrung_Governance: Block = {
  slug: 'fuhrung_governance',
  imageURL: '/block-previews/Fuhrung_Governance.png',
  imageAltText: 'Führung Governance',
  interfaceName: 'FuhrungGovernanceBlock',
  labels: {
    singular: 'Führung Governance',
    plural: 'Führung Governance Sections',
  },
  fields: [
    {
      name: 'boxes',
      type: 'array',
      label: 'Führung Governance Boxes',
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
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
