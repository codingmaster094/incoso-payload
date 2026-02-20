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
    singular: {
      en: "Our boxing section",
      de: "Unsere Boxen-Sektion"
    },
    plural: {
      en: "Our boxing sections",
      de: "Unsere Boxen-Sektionen"
    },
  },
  fields: [
    {
      name: 'boxes',
      type: 'array',
      label: {
        en: "Right Left Boxes",
        de: "Rechts Links Boxen"
      },
      required: false,
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: {
            en: "Image Position",
            de: "Bild Position"
          },
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
          label: {
            en: "Main Box Title",
            de: "Haupt Box Überschrift"
          },
        },
        {
          name: 'unsere_boxesimage',
          type: 'upload',
          label: {
            en: "Unsere Boxes Image",
            de: "Unsere Boxen Bild"
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
