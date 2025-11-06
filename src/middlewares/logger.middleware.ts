import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/helpers";

export const log = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;
    logger.info(`Incoming request ${method} ${originalUrl}`, 'HTTP');
    next();
}
