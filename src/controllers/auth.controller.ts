import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { authService, userService } from '../services'
import { STATUS_CODES } from '../constants'
import { generateResponse } from '../utils/response'

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body
  const result = await authService.register({ email, password, firstName, lastName, role })
  generateResponse(res, STATUS_CODES.CREATED, 'User registered successfully', result)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const result = await authService.login({ email, password })
  generateResponse(res, STATUS_CODES.OK, 'Login successful', result)
})

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return generateResponse(res, STATUS_CODES.UNAUTHORIZED, 'Unauthorized', null)
  }
  const user = await userService.findByIdOrFail(req.user.sub)
  generateResponse(res, STATUS_CODES.OK, 'User profile fetched successfully', { user })
})
