import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { userService } from '../services'
import { STATUS_CODES } from '../constants'

export const findUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findByIdOrFail(req.params.id)
  res.status(STATUS_CODES.OK).json({ user })
})
