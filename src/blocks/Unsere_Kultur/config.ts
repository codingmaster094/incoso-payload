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
    singular: {
      en: "Our culture",
      de: "Unsere Kultur"
    },
    plural: {
      en: "Our cultures",
      de: "Unsere Kulturen"
    },
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
      label: {
        en: "Our culture Heading",
        de: "Unsere Kultur Überschrift"
      },
    },
    {
      name: 'unsere_kulturimage',
      type: 'upload',
      label: {
        en: "Our culture Image",
        de: "Unsere Kultur Bild"
      },
      relationTo: 'media',
      required: false,
    },

    {
      name: 'boxHeading1',
      type: 'text',
      label: {
        en: "Box Heading 1",
        de: "Box Überschrift 1"
      },
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
      label: {
        en: "Our culture Description",
        de: "Unsere Kultur Beschreibung"
      },
    },
    {
      name: 'boxHeading2',
      type: 'text',
      label: {
        en: "Box Heading 2",
        de: "Box Überschrift 2"
      },
    },
    {
      name: 'boxbutton1',
      type: 'group',
      label: {
        en: "Button 1",
        de: "Knopf 1"
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
    {
      name: 'boxbutton2',
      type: 'group',
      label: {
        en: "Button 2",
        de: "Knopf 2"
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
}
