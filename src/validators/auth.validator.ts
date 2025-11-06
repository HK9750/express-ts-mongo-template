import { z } from 'zod'
import { ROLES } from '../constants'

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum([ROLES.ADMIN, ROLES.USER]).optional()
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})
