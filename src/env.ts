import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV: string = process.env.NODE_ENV!;
export const API_BASE_URL: string = process.env.API_BASE_PATH!;

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT!, 10);
export const LOG_PATH: string = path.resolve(process.env.LOG_PATH!);
export const JWT_SECRET: string = process.env.JWT_SECRET!;

export const POSTGRES_HOST: string = process.env.POSTGRES_HOST!;
export const POSTGRES_USER: string = process.env.POSTGRES_USER!;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD!;
export const POSTGRES_DB: string = process.env.POSTGRES_DB!;

export const EMAIL_SECURE: boolean = process.env.EMAIL_SECURE === 'true';
export const EMAIL_HOST: string = process.env.EMAIL_HOST!;
export const EMAIL_PORT: number = parseInt(process.env.EMAIL_PORT!, 10);
export const EMAIL_USER: string = process.env.EMAIL_USER!;
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD!;
export const EMAIL_FROM: string = process.env.EMAIL_FROM!;
