import knex from 'knex';
import { createValidator } from 'express-joi-validation';
import knexConfig from '../knexfile';
import { HTTP_PORT } from './env';
import createServer from './server';
import createLogger from './logger';
import createMailer from './email';

const logger = createLogger();
createMailer(logger)
  .then((mailer) => {
    const server = createServer({
      logger,
      mailer,
      db: knex(knexConfig),
      validator: createValidator(),
    });

    server.listen(HTTP_PORT, () => {
      logger.info(`TripSit API running on port ${HTTP_PORT}.`);
    });
  })
  .catch((ex) => {
    logger.error('Could not create mailer: ', ex);
    return Promise.reject(ex);
  });
