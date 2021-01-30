'use strict';

module.exports = function initializeDatabase() {
	const knex = Knex(knexConfig);
	Model.knex(knex);
	return knex;
};
