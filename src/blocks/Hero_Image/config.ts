import { Block } from 'payload'

export const Hero_Image: Block = {
  slug: 'hero_image',
  imageURL: '/block-previews/hero_image.jpg',
  imageAltText: 'Hero banner',
 
  labels: {
    singular: 'Hero Image',
    plural: 'Hero Images',
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
