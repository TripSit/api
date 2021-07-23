'use strict';

require('dotenv').config();
const { createConnection } = require('@tripsit/db');
const createLogger = require('./logger');
const createServer = require('./create-server');

const logger = createLogger();

createConnection()
  .then(() => createServer({ logger }))
  .catch(ex => {
    logger.error(ex);
    console.error('Unable to initialize API.');
    process.exit(1);
  });
