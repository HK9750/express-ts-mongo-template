import { NextFunction, Request, Response, Router } from 'express'
import AuthRoutes from './auth.route'
import UserRoutes from './user.route'
import RootRoutes from './root.route'
import { logger } from '../utils/helpers'

type RouteGroup = {
  getRouter: () => Router
  getRouterGroup: () => string
}

export default class ApiRoutes {
  public readonly router: Router
  private readonly routeGroups: RouteGroup[]

  constructor() {
    this.router = Router()
    this.routeGroups = []
    this.loadRouteGroups()
    this.registerGroups()
  }

  private loadRouteGroups(): void {
    this.routeGroups.push(new RootRoutes())
    this.routeGroups.push(new AuthRoutes())
    this.routeGroups.push(new UserRoutes())
  }

  private setContentType(_req: Request, res: Response, next: NextFunction): void {
    res.set('Content-Type', 'application/json')
    next()
  }

  private registerGroups(): void {
    this.routeGroups.forEach((group) => {
      const prefix = `/api${group.getRouterGroup()}`
      logger.info(`Registering route group at prefix: ${prefix}`, 'Routes')
      this.router.use(prefix, this.setContentType.bind(this), group.getRouter())
    })
  }
}

export { ApiRoutes }
