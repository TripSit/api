import { Knex } from 'knex';

export async function up(knex: Knex) {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

	return knex.schema
		.createTable('users', (table) => {
			table
				.uuid('id')
				.notNullable()
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table
				.string('nick', 32)
				.notNullable()
				.unique();
			table.text('password').notNullable();
			table.string('discord_id', 32).unique();
			table
				.timestamp('created_at')
				.notNullable()
				.defaultTo(knex.fn.now());
		})
		.createTable('user_roles', (table) => {
			table
				.uuid('id')
				.primary()
				.notNullable()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table
				.uuid('user_id')
				.notNullable()
				.references('id')
				.inTable('users');
			table
				.enum('role', [
					'operator',
					'moderator',
					'tripsitter',
					'contributor',
					'alumini',
				], {
					enumName: 'role',
					useNative: true,
				})
				.notNullable();
			table
				.timestamp('created_at')
				.notNullable()
				.defaultTo(knex.fn.now());
		});
};

exports.down = async function down(knex: Knex) {
	await knex.schema
		.dropTableIfExists('user_roles')
		.dropTableIfExists('users');
	return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
