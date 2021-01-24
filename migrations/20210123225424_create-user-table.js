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
			.notNullable()
			.unique();
		table
			.text('password')
			.notNullable();
		table
			.timestamp('created_at')
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('user');
	return knex.raw(sql`DROP EXTENSION IF EXISTS "uuid-ossp";`);
};
