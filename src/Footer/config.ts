import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTMLField,
} from '@payloadcms/richtext-lexical'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    de: 'Fußzeile',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Kontakt_zu_Incoso',
      type: 'text',
      label: {
        en: "Contact to Incoso",
        de: "Kontakt zu Incoso"
      },
      required: false,
    },
    {
      name: 'Kontaktformular',
      type: 'text',
      label: {
        en: "Contact Form",
        de: "Kontaktformular"
      },
      required: false,
    },
    {
      name: 'Folgen_Sie_uns',
      type: 'text',
      label: {
        en: "Follow us",
        de: "Folgen Sie uns"
      },
      required: false,
    },
    {
      name: 'socials',
      type: 'array',
      label: {
        en: "Social Media",
        de: "Social Media"
      },
      required: false,
      fields: [
        {
          name: 'social_icon',
          type: 'upload',
          label: {
            en: "Social Icons",
            de: "Social Icons"
          },
          relationTo: 'media',
          required: false,
        },
        {
          name: 'social_url',
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
                en: "Social Button Label",
                de: "Soziale Schaltfläche Bezeichnung"
              },
            },
            {
              name: 'url',
              type: 'text',
              label: {
                en: "Social Button Url",
                de: "Soziale Schaltfläche URL"
              },
            },
            {
              name: 'target',
              type: 'select',
              label: {
                en: "Social Button Target",
                de: "Soziale Schaltfläche Ziel"
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
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
      label: {
        en: "Description",
        de: "Beschreibung"
      },
    },
    lexicalHTMLField({
      htmlFieldName: 'description_html',
      lexicalFieldName: 'description',
    }),
    {
      name: 'privacy',
      type: 'array',
      label: {
        en: "Privacy titles",
        de: "Datenschutz Titel"
      },
      required: false,
      fields: [
        {
          name: 'items',
          type: 'text',
          label: {
            en: "Privacy Item",
            de: "Datenschutz Element"
          },
          required: false,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: {
        en: "Copyright text",
        de: "Copyright Text"
      },
      required: false,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
