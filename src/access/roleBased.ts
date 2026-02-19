import type { Access, FieldAccess } from 'payload'
import type { User } from '../payload-types'

type AccessArgs = Parameters<Access>[0]

export const isAdmin = ({ req }: AccessArgs) => Boolean((req?.user as User | undefined)?.roles?.includes('admin'))
export const isEditor = ({ req }: AccessArgs) => Boolean((req?.user as User | undefined)?.roles?.includes('editor'))
export const isAuthor = ({ req }: AccessArgs) => Boolean((req?.user as User | undefined)?.roles?.includes('author'))

// Field-level accessors (match FieldAccess signature)
export const isAdminField: FieldAccess = ({ req }) => Boolean((req?.user as User | undefined)?.roles?.includes('admin'))

// Create: admin, editor, author
export const canCreate: Access = ({ req }) => {
  if (!req?.user) return false
  const roles: (User['roles'][number])[] = (req.user as User | undefined)?.roles ?? []
  return roles.includes('admin') || roles.includes('editor') || roles.includes('author')
}

// Update: admin and editor can update any; authors can update their own docs
export const canUpdate: Access = ({ req }) => {
  if (!req?.user) return false
  const roles = (req.user as User | undefined)?.roles ?? []
  if (roles.includes('admin')) return true
  if (roles.includes('editor')) return true

  if (roles.includes('author')) {
    // Authors may update documents they are listed on via `authors` relationship
    return { authors: { in: [req.user.id] } }
  }

  return false
}

// Delete: admins only
export const canDelete: Access = ({ req }) => Boolean((req?.user as User | undefined)?.roles?.includes('admin'))

export default {
  isAdmin,
  isEditor,
  isAuthor,
  canCreate,
  canUpdate,
  canDelete,
}
