import Knex from 'knex';
import { Logger } from 'winston';

declare global {
	interface ServerDependencies {
		knex: Knex;
		logger: Logger;
	}
}
