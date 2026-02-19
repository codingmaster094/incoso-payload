import type { Access } from 'payload'

type AccessArgs = Parameters<Access>[0]

export const isAdmin = ({ req: { user } }: AccessArgs) => Boolean(user?.roles?.includes('admin'))

export const isEditor = ({ req: { user } }: AccessArgs) => Boolean(user?.roles?.includes('editor'))

export const canCreate: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  if (user.roles?.includes('editor')) return true
  return false
}

export const canUpdate: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  if (user.roles?.includes('editor')) return true
  // For ownership-based update, return a query object instead:
  // return { author: { equals: user.id } }
  return false
}

export const canDelete: Access = ({ req: { user } }) => {
  if (!user) return false
  // Only admins can delete by default
  return user.roles?.includes('admin')
}

export default {
  isAdmin,
  isEditor,
  canCreate,
  canUpdate,
  canDelete,
}
