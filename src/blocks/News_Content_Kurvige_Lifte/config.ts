import { Block } from 'payload'

export const Kurvige_Lifte: Block = {
  slug: 'kurvige_lifte',
  labels: {
    singular: 'Kurvige Lifte Image',
    plural: 'Kurvige Lifte Images',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en:"title",
        de:"Titel"
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
