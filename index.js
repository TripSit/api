'use strict';

const knex = require('knex');
const createValidator = require('express-joi-validation');
const createServer = require('./server');
const knexConfig = require('./knexfile');
const createLogger = require('./logger');

const logger = createLogger();
const server = createServer({
  logger,
  db: knex(knexConfig),
  validator: createValidator(),
});

server.listen(3000, () => {
  logger.info('TripSit API running on port 3000');
});
