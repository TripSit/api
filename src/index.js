'use strict';

const createDb = require('@tripsit/db');
const { createValidator } = require('express-joi-validation');
const createLogger = require('./logger');
const createServer = require('./create-server');

const logger = createLogger();

createServer({
  logger,
  db: createDb(),
  validator: createValidator(),
}).catch(ex => {
  logger.error('Unable to initialize API', ex);
  process.exit(1);
});
