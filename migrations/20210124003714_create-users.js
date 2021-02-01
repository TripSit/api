'use strict';

const sql = require('fake-tag');

exports.up = async function up(knex) {
	await knex.raw(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

	await knex.schema.createTable('users', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.text('nick')
			.unique()
			.notNullable();

		table
			.text('passwordHash')
			.notNullable();

		table.text('email');

		table
			.timestamp('lastSeen')
			.notNullable()
			.defaultTo(knex.fn.now());

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('roles', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table.text('name').notNullable();
	});

	await knex.schema.createTable('userRoles', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.uuid('userId')
			.notNullable()
			.references('users.id');

		table
			.uuid('roleId')
			.notNullable()
			.references('roles.id');

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('roles');
	await knex.schema.dropTableIfExists('users');
	await knex.raw(sql`DROP EXTENSION IF EXISTS "uuid-ossp"`);
};
