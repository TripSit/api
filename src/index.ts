import knex from 'knex';
import knexConfig from '../knexfile';
import { createValidator } from 'express-joi-validation';
import { HTTP_PORT } from './env';
import createServer from './server';
import createLogger from './logger';

const logger = createLogger();

const server = createServer({
	logger,
	db: knex(knexConfig),
	validator: createValidator(),
});

server.listen(HTTP_PORT, () => {
	logger.info('TripSit API running on port 3000');
});
