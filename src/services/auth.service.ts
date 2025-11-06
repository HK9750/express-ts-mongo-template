import bcrypt from 'bcryptjs'
import { UserRepository } from '../repositories'
import { HttpError } from '../utils/HttpError'
import { Role, ROLES, STATUS_CODES } from '../constants'
import { signAccessToken } from './token.service'
import { IUser } from '../schema'

type RegisterInput = {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: Role
}

type LoginInput = {
  email: string
  password: string
}

class AuthService {
  async register(input: RegisterInput) {
    const existingDoc = await UserRepository.get({ email: input.email })
    if (existingDoc) {
      throw new HttpError('Email already in use', STATUS_CODES.BAD_REQUEST)
    }

    const createdDoc = await UserRepository.create({
      email: input.email,
      passwordHash: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role ?? ROLES.USER
    })

    const user = createdDoc.toObject();
    const token = signAccessToken(user)
    return { user: this.toPublicUser(user), token }
  }

  async login(input: LoginInput) {
    const userDoc = await UserRepository.get({ email: input.email })
    if (!userDoc) {
      throw new HttpError('Invalid credentials', STATUS_CODES.UNAUTHORIZED)
    }

    const user = userDoc.toObject()
    const isValid = await bcrypt.compare(input.password, user.passwordHash)
    if (!isValid) {
      throw new HttpError('Invalid credentials', STATUS_CODES.UNAUTHORIZED)
    }

    const token = signAccessToken(user)
    return { user: this.toPublicUser(user), token }
  }

  toPublicUser(user: IUser) {
    const { passwordHash: _passwordHash, _id, ...rest } = user
    return {
      id: _id?.toString(),
      ...rest
    }
  }
}

export const authService = new AuthService()
