import { NextFunction, Request, Response } from "express";
import { generateResponse } from "../utils/response";
import packageJson from "../../package.json";
import { asyncHandler } from "../utils/asyncHandler";
import { STATUS_CODES } from "http";

export const defaultHandler = asyncHandler(async (req: Request, res: Response) => {
    generateResponse(res, 200, 'API is running', {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
    });
});

export const uploadFiles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files;

    if (!files) return next({
        statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'No files uploaded'
    });

    if (req.fileValidationError) return next({
        statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: req.fileValidationError || 'Invalid file type!'
    });

    const acceptedFiles: Express.Multer.File[] = Array.isArray(files)
        ? (files as Express.Multer.File[])
        : (files as { [fieldname: string]: Express.Multer.File[] })['images'] ?? [];

    const imageUrls = acceptedFiles.map((file: Express.Multer.File) => `${process.env.BASE_URL}/${file.path}`);

    generateResponse(res, 200, 'Files uploaded successfully', { imageUrls });
});
