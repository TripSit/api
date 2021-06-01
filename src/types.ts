import { Knex } from 'knex';
import { Logger } from 'winston';
import { ExpressJoiInstance } from 'express-joi-validation';
import { Mailer } from './email';

export interface Deps {
  db: Knex;
  logger: Logger;
  validator: ExpressJoiInstance;
  mailer: Mailer;
}
