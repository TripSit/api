'use strict';

const createDb = require('@tripsit/db');
const { createValidator } = require('express-joi-validation');
const createLogger = require('./logger');
const createServer = require('./create-server');
const { HTTP_PORT } = require('./env');

const logger = createLogger();

createServer({
  logger,
  db: createDb(),
  validator: createValidator(),
})
  .then(() => {
    logger.info(`API service running on port ${HTTP_PORT}`)
  })
  .catch(ex => {
    logger.error('Unable to initialize API', ex);
    process.exit(1);
  });
