import { Router } from 'express'

export default class RootRoutes {
  public readonly router: Router

  constructor () {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get('/', (_req, res) => {
      res.json({ message: 'API root' })
    })
  }

  public getRouter (): Router {
    return this.router
  }

  public getRouterGroup (): string {
    return ''
  }
}
