import { RequestHandler } from 'express'
import { Role, STATUS_CODES } from '../constants'

export const requireRole = (...roles: Role[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' })
    }

    if (!roles.includes(req.user.role as Role)) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Insufficient privileges' })
    }

    next()
  }
}
