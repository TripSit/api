import path from 'path';
import winston from 'winston';
import { NODE_ENV, LOG_PATH } from './env.js';

export default function createLogger() {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.File({ filename: path.join(LOG_PATH, 'combined.log') }),
      new winston.transports.File({
        filename: path.resolve('error.log'),
        level: 'error',
      }),
    ],
  });

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
  }

  return logger;
}
