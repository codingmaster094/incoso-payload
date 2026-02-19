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
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Kontakt_zu_Incoso',
      type: 'text',
      label: 'Kontakt zu Incoso',
      required: false,
    },
    {
      name: 'Kontaktformular',
      type: 'text',
      label: 'Kontaktformular',
      required: false,
    },
    {
      name: 'Folgen_Sie_uns',
      type: 'text',
      label: 'Folgen Sie uns',
      required: false,
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Media',
      required: false,
      fields: [
        {
          name: 'social_icon',
          type: 'upload',
          label: 'Social Icons',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'social_url',
          type: 'group',
          label: 'Button',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Social Button Label',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Social Button Url',
            },
            {
              name: 'target',
              type: 'select',
              label: 'Social Button Target',
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
      label: 'Description',
    },
    lexicalHTMLField({
      htmlFieldName: 'description_html',
      lexicalFieldName: 'description',
    }),
    {
      name: 'privacy',
      type: 'array',
      label: 'Privacy titles',
      required: false,
      fields: [
        {
          name: 'items',
          type: 'text',
          label: 'Privacy Item',
          required: false,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright text',
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
