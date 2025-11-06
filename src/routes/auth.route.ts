import { Router } from 'express'
import { login, me, register } from '../controllers'
import { validate } from '../middlewares/validate.middleware'
import { registerSchema, loginSchema } from '../validators/auth.validator'
import { authMiddleware } from '../middlewares/auth.middleware'

export default class AuthRoutes {
  public readonly router: Router

  constructor () {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.post('/register', validate(registerSchema), register)
    this.router.post('/login', validate(loginSchema), login)
    this.router.get('/me', authMiddleware(), me)
  }

  public getRouter (): Router {
    return this.router
  }

  public getRouterGroup (): string {
    return '/auth'
  }
}
