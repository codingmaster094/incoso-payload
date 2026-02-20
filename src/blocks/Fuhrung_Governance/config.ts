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
      singular: {
        en: "Leadership Governance",
      de: "Führung Governance"
    },
    plural: {
      en: "Leadership Governance Sections",
      de: "Führung Governance Sektionen"
    },
  },
  fields: [
    {
      name: 'boxes',
      type: 'array',
      label: {
        en: "Leadership Governance Boxes",
        de: "Führung Governance Boxen"
      },
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: {
            en: "Heading",
            de: "Überschrift"
          },
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
          label: {
            en: "Box Description",
            de: "Box Beschreibung"
          },
        },
        {
          name: 'boxbutton',
          type: 'group',
          label: {
            en: "Button",
            de: "Button"
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: {
                en: "Box Button Label",
                de: "Box Button Label"
              },
            },
            {
              name: 'url',
              type: 'text',
              label: {
                en: "Box Button Url",
                de: "Box Button Url"
              },
            },
            {
              name: 'target',
              type: 'select',
              label: {
                en: "Box Button Target",
                de: "Box Button Target"
              },
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
