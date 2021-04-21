import knex from 'knex';
import createValidator from 'express-joi-validation';
import createServer from './server/index.js';
import knexConfig from './knexfile.js';
import createLogger from './logger.js';

const logger = createLogger();
const server = createServer({
  logger,
  db: knex(knexConfig),
  validator: createValidator(),
});

server.listen(3000, () => {
  logger.info('TripSit API running on port 3000');
});
