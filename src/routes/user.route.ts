import { Router } from 'express'
import { findUserById } from '../controllers'
import { authMiddleware } from '../middlewares/auth.middleware'
import { requireRole } from '../middlewares/role.middleware'
import { ROLES } from '../constants'

export default class UserRoutes {
  public readonly router: Router

  constructor () {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get('/:id', authMiddleware(), requireRole(ROLES.ADMIN), findUserById)
  }

  public getRouter (): Router {
    return this.router
  }

  public getRouterGroup (): string {
    return '/users'
  }
}
