import * as path from 'path';
import { config } from 'dotenv';

config();

export const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10);
export const LOG_PATH = path.resolve(process.env.LOG_PATH);

export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SESSION_SECURE = process.env.SESSION_SECURE === 'true';
