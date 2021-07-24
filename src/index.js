'use strict';

const { createConnection } = require('@tripsit/db');
const { createValidator } = require('express-joi-validation');
const createLogger = require('./logger');
const createServer = require('./create-server');

const logger = createLogger();
const validator = createValidator();

createConnection()
  .then(() => createServer({ logger, validator }))
  .catch(ex => {
    logger.error(ex);
    console.error('Unable to initialize API.');
    process.exit(1);
  });
