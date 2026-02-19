import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdminField } from '../../access/roleBased'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Allow public signup (no req.user) but require admin for admin-initiated creates
    create: ({ req }) => {
      if (!req?.user) return true
      return Boolean((req.user as any)?.roles?.includes('admin'))
    },
    delete: ({ req }) => Boolean((req.user as any)?.roles?.includes('admin')),
    read: authenticated,
    // Allow admins and editors to update users
    update: ({ req }) => Boolean((req.user as any)?.roles?.includes('admin') || (req.user as any)?.roles?.includes('editor')),
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
      defaultValue: ['admin'],
      saveToJWT: true,
      access: {
        // Only admins may set roles in the admin UI
        create: isAdminField,
        update: isAdminField,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        if (operation === 'create') {
          try {
            const existing = await req.payload.find({ collection: 'users', limit: 1, depth: 0 })
            const total = (existing as any).totalDocs ?? (existing as any).docs?.length ?? 0

            if (total === 0) {
              // Make the very first user an admin
              return {
                ...data,
                roles: ['admin'],
              }
            }
          } catch (e) {
            // ignore errors and continue
          }

          // If this is a public signup (no req.user), ensure roles cannot be set
          if (!req?.user) {
            return {
              ...data,
              roles: ['author'],
            }
          }
        }

        return data
      },
    ],
  },
  timestamps: true,
}
