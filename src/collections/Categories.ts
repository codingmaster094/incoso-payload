import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { isAdmin, isAuthor, isEditor } from '../access/roleBased'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    admin: authenticated,
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: (args) => isAdmin(args) || isEditor(args) || isAuthor(args),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
