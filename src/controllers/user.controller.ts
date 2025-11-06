import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { userService } from '../services'
import { STATUS_CODES } from '../constants'
import { generateResponse } from '../utils/response'

export const findUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findByIdOrFail(req.params.id)
  generateResponse(res, STATUS_CODES.OK, 'User fetched successfully', { user })
})
