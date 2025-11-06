import { Schema, Document } from 'mongoose'
import { ROLES } from '../constants'
import { hashPassword } from '../utils/helpers'

export interface IUser extends Document {
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  role: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  }
}, {
  timestamps: true,
  versionKey: false
})

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await hashPassword(this.passwordHash, 10);
  next();
});

export { UserSchema }