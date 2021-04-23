'use strict';

const path = require('path');
const winston = require('winston');
const { NODE_ENV, LOG_PATH } = require('./env');

module.exports = function createLogger() {
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
};
