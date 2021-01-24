import path from 'path';
import winston, { Logger } from 'winston';
import { LOG_PATH } from './env'

export default function createLogger(): Logger {
	const logger = winston.createLogger({
		format: winston.format.combine(
			winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			winston.format.errors({ stack: true }),
			winston.format.simple(),
		),
		transports: [
			new winston.transports.File({
				filename: path.join(LOG_PATH, 'error.log'),
				level: 'error',
			}),
			new winston.transports.File({
				filename: path.join(LOG_PATH, 'combined.log'),
			}),
		],
	});

	// When not in production log output to the console as well
	if (process.env.NODE_ENV !== 'production') {
		logger.add(new winston.transports.Console({
			format: winston.format.simple(),
		}));
	}

	return logger;
};
