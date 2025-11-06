import { UserRepository } from '../repositories'
import { HttpError } from '../utils/HttpError'
import { STATUS_CODES } from '../constants'
import { LeanDocument } from 'mongoose'
import { IUser } from '../schema'

class UserService {
  async findByIdOrFail (id: string) {
    const userDoc = await UserRepository.get({ _id: id })
    if (!userDoc) {
      throw new HttpError('User not found', STATUS_CODES.NOT_FOUND)
    }

    const { passwordHash: _passwordHash, _id, ...safeUser } = userDoc.toObject() as LeanDocument<IUser>
    return {
      id: _id?.toString(),
      ...safeUser
    }
  }
}

export const userService = new UserService()
