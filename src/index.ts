import { HTTP_PORT } from './env';
import './yup-locale';
import { initializeDb } from './models';
import createServer from './server';
import createLogger from './logger';

const logger = createLogger();

const server = createServer({
	logger,
	knex: initializeDb(),
});

server.listen(HTTP_PORT, () => {
	logger.info('TripSit API running on port 3000');
});
