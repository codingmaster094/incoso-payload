import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/roleBased'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Allow public signup (no req.user) but restrict admin-initiated create to admins
    create: ({ req }) => {
      if (!req?.user) return true // public signup
      return Boolean(req.user?.roles?.includes('admin'))
    },
    delete: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
    read: authenticated,
    update: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'editor', 'author'],
      required: true,
      defaultValue: ['author'],
      saveToJWT: true,
      access: {
        create: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
        update: ({ req }) => Boolean(req.user?.roles?.includes('admin')),
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        // If this is a public signup (no req.user), ensure roles cannot be set
        if (operation === 'create' && !req?.user) {
          return {
            ...data,
            roles: ['author'],
          }
        }

        // Otherwise leave data untouched
        return data
      },
    ],
  },
  timestamps: true,
}
