import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { authService, userService } from '../services'
import { STATUS_CODES } from '../constants'

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body
  const result = await authService.register({ email, password, firstName, lastName, role })
  res.status(STATUS_CODES.CREATED).json(result)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const result = await authService.login({ email, password })
  res.status(STATUS_CODES.OK).json(result)
})

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }
  const user = await userService.findByIdOrFail(req.user.sub)
  res.status(STATUS_CODES.OK).json({ user })
})
