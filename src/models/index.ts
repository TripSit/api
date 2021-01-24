import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile';

export function initializeDb(): Knex {
	const knex = Knex(knexConfig);
	Model.knex(knex);
	return knex;
}
