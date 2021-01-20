'use strict';

const path = require('path');
const winston = require('winston');

module.exports = function createLogger() {
	const logger = winston.createLogger({
		format: winston.format.combine(
			winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			winston.format.errors({ stack: true }),
			winston.format.simple(),
		),
		transports: [
			new winston.transports.File({
				filename: path.join(process.env.LOG_PATH, 'error.log'),
				level: 'error',
			}),
			new winston.transports.File({
				filename: path.join(process.env.LOG_PATH, 'combined.log'),
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
