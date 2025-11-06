import { RequestHandler } from 'express'
import { AnyZodObject } from 'zod'
import { STATUS_CODES } from '../constants'

type Location = 'body' | 'params' | 'query'

export const validate = (schema: AnyZodObject, location: Location = 'body'): RequestHandler => {
  return (req, res, next) => {
    const target = (req as any)[location]
    const parsed = schema.safeParse(target)

    if (!parsed.success) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: 'Validation failed',
        errors: parsed.error.flatten()
      })
    }

    ;(req as any)[location] = parsed.data
    next()
  }
}
