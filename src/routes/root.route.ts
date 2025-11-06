import { Router } from 'express'
import { defaultHandler, uploadFiles } from '../controllers/root.controller'
import { fileUploader } from '../utils/multer'

export default class RootRoutes {
  public readonly router: Router

  constructor() {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes(): void {
    this.router.get('/', defaultHandler);
    this.router.post('/upload', fileUploader.fields([{ name: 'images', maxCount: 5 }]), uploadFiles)
  }

  public getRouter(): Router {
    return this.router
  }

  public getRouterGroup(): string {
    return ''
  }
}
