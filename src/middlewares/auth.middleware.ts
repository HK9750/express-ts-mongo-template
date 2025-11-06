import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../services/token.service'
import { Role, STATUS_CODES } from '../constants'

export const authMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization
    const token = bearerToken?.startsWith('Bearer ') ? bearerToken.split(' ')[1] : undefined

    if (!token) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Authorization failed' })
    }

    try {
      const decoded = verifyAccessToken(token) as any
      req.user = {
        sub: decoded.sub,
        role: decoded.role as Role,
        email: decoded.email
      }
      next()
    } catch (error) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid token' })
    }
  }
}

export default authMiddleware
