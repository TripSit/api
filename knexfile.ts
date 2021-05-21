// @ts-ignore
import stringcase from 'knex-stringcase';

import {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
} from './src/env';

export default stringcase({
	client: 'pg',
	connection: {
		host: POSTGRES_HOST,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
	},
});
