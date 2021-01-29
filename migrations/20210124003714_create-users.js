'use strict';

const sql = require('fake-tag');

exports.up = async function up(knex) {
	await knex.raw(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

	return knex.schema.createTable('users', table => {
		table
			.uuid('id')
			.primary()
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'));

		table
			.text('nick')
			.unique()
			.notNullable();

		table
			.text('passwordHash')
			.notNullable();

		table.text('email');

		table
			.timestamp('lastAuthenticated')
			.notNullable()
			.defaultTo(knex.fn.now());

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('users');
	return knex.raw(sql`DROP EXTENSION IF EXISTS "uuid-ossp"`);
};
