import { Error as MongooseError } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { logger } from '../utils/helpers';

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode ? err.statusCode : err instanceof MongooseError ? 400 : 500;

  // log error in console
  logger.error(`${statusCode} - ${err.message}`, 'ExceptionsHandler');

  // send error response
  return res.status(statusCode).json({
    statusCode,
    message: err?.message?.replace(/"/g, '') || 'Internal Server Error',
    stack: err.stack || 'No stack trace available',
  });
}
