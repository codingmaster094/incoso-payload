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
    singular: {
      en: "What we do",
      de: "Was wir tun"
    },
    plural: {
      en: "What we do sections",
      de: "Was wir tun Sektionen"
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: {
        en: "Main Heading",
        de: "Haupt Überschrift"
      },
    },
    {
      name: 'boxes',
      type: 'array',
      label: {
        en: "What we do boxes",
        de: "Was wir tun Boxen"
      },
      required: false,
      fields: [
        {
          name: 'was_wir_tunimage',
          type: 'upload',
          label: {
            en: "What we do image",
            de: "Was wir tun Bild"
          },
          relationTo: 'media',
          required: false,
        },
        {
          name: 'heading',
          type: 'text',
          required: false,
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
            de: "Knopf"
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: {
                en: "Button Label",
                de: "Knopf Beschriftung"
              },
            },
            {
              name: 'url',
              type: 'text',
              label: {
                en: "Button Url",
                de: "Knopf Url"
              },
            },
            {
              name: 'target',
              type: 'select',
              label: {
                en: "Button Target",
                de: "Knopf Ziel"
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
