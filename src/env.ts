import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV: string = process.env.NODE_ENV!;
export const API_BASE_URL: string = process.env.API_BASE_PATH!;

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT!, 10);
export const LOG_PATH: string = path.resolve(process.env.LOG_PATH!);

export const POSTGRES_HOST: string = process.env.POSTGRES_HOST!;
export const POSTGRES_USER: string = process.env.POSTGRES_USER!;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD!;
export const POSTGRES_DB: string = process.env.POSTGRES_DB!;
