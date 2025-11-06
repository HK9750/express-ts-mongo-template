import { sign, verify } from 'jsonwebtoken'
import { env } from '../config/env'
import { IUser } from '../schema'

export const signAccessToken = (user: Pick<IUser, 'email' | 'role'> & { _id?: string }) => {
  const subject = user._id?.toString()
  const payload = { sub: subject, role: user.role, email: user.email }
  return sign(payload, env.accessTokenSecret, { expiresIn: env.accessTokenExpiresIn })
}

export const verifyAccessToken = (token: string) => {
  return verify(token, env.accessTokenSecret)
}
