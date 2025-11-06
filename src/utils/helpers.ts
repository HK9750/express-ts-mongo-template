import jwt from 'jsonwebtoken';
import { JwtPayload, } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Logger } from './logger';

export const logger = new Logger('Application');

export const decodeJwtToken = (token: string): JwtPayload | null => {
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        return decodedToken;
    } catch (error) {
        logger.error('JWT verification error', 'Auth', error);
        return null;
    }
};

export const hashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

