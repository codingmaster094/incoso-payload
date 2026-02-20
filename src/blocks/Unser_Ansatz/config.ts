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
    singular: {
      en: "Our approach",
      de: "Unser Ansatz"
    },
    plural: {
      en: "Our approach",
      de: "Unser Ansatz"
    },
  },

  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: {
        en: "Heading",
        de: "Überschrift"
      },
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
      label: {
        en: "Description",
        de: "Beschreibung"
      },
    },
    {
      name: 'boxHeading',
      type: 'text',
      label: {
        en: "Box Heading",
        de: "Box Überschrift"
      },
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
      label: {
        en:'Box Description',
        de:"Box Beschreibung"
      },
    },
    {
      name: 'boxbutton',
      type: 'group',
      label: {
        en:'Button',
        de:"Knopf",
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en:'Button Label',
            de:"Knopf Beschriftung",
          },
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en:'Button Url',
            de:"Knopf Url",
          },
        },
        {
          name: 'target',
          type: 'select',
          label: {
            en:'Button Target',
            de:"Knopf Ziel",
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
      name: 'boximage',
      type: 'upload',
      label: {
        en:'Box Image',
        de:"Box Bild",
      },
      relationTo: 'media',
      required: false,
    },
  ],
}
