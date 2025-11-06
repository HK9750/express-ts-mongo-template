import 'express-serve-static-core'
import { MulterFilesMap } from '../utils/interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      sub: string
      role: string
      email: string
    }
    session?: { accessToken: string };
    files?: MulterFilesMap | Express.Multer.File[];
    file?: Express.Multer.File;
    fileValidationError?: string;
  }
}
