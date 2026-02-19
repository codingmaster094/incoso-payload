import type { Access } from 'payload'

type AccessArgs = Parameters<Access>[0]

export const isAdmin = ({ req }: AccessArgs) => Boolean((req?.user as any)?.roles?.includes('admin'))
export const isEditor = ({ req }: AccessArgs) => Boolean((req?.user as any)?.roles?.includes('editor'))
export const isAuthor = ({ req }: AccessArgs) => Boolean((req?.user as any)?.roles?.includes('author'))

// Create: admin, editor, author
export const canCreate: Access = ({ req }) => {
  if (!req?.user) return false
  const roles: string[] = (req.user as any)?.roles ?? []
  return roles.includes('admin') || roles.includes('editor') || roles.includes('author')
}

// Update: admin and editor can update any; authors can update their own docs
export const canUpdate: Access = ({ req }) => {
  if (!req?.user) return false
  const roles = (req.user as any)?.roles ?? []
  if (roles.includes('admin')) return true
  if (roles.includes('editor')) return true

  if (roles.includes('author')) {
    // Authors may update documents they are listed on via `authors` relationship
    return { authors: { in: [req.user.id] } }
  }

  return false
}

// Delete: admins only
export const canDelete: Access = ({ req }) => Boolean((req?.user as any)?.roles?.includes('admin'))

export default {
  isAdmin,
  isEditor,
  isAuthor,
  canCreate,
  canUpdate,
  canDelete,
}
