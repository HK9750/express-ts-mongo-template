import BaseModel from './common/BaseModel'
import { IUser, UserSchema } from '../schema'

export const UserRepository = new BaseModel<IUser>('User', UserSchema)
