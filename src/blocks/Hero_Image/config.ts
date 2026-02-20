import { Block } from 'payload'

export const Hero_Image: Block = {
  slug: 'hero_image',
  imageURL: '/block-previews/hero_image.jpg',
  imageAltText: 'Hero banner',
 
  labels: {
    singular: {
      en: "Hero Image",
      de: "Hero Bild"
    },
    plural: {
      en: "Hero Images",
      de: "Hero Bilder"
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
