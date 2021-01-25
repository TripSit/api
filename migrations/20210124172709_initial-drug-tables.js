'use strict';

exports.up = async function up(knex) {
	await knex.schema.createTable('drugClasses', table => {
		table
			.uuid('id')
			.primary()
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'));

		table
			.text('name')
			.unique()
			.notNullable();

		table
			.text('description')
			.notNullable();

		table.enum('type', ['PSYCHOACTIVE', 'CHEMICAL'], {
			useNative: true,
			enumName: 'drug_class_type',
		});
	});

	await knex.schema.createTable('drugs', table => {
		table
			.uuid('id')
			.primary()
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'));

		table
			.uuid('drugClassId')
			.references('id')
			.inTable('drugClasses')
			.notNullable();

		table.text('summary');

		table
			.timestamp('updatedAt')
			.notNullable()
			.defaultTo(knex.fn.now());

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('drugDoses', table => {
		table
			.uuid('id')
			.primary()
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'));

		table
			.uuid('drugId')
			.references('id')
			.inTable('drugs')
			.notNullable();

		table.enum('roa', [
			'ORAL',
			'INSUFFLATION',
			'INHALATION',
			'RECTAL',
			'TOPICAL',
			'BUCCAL',
			'SI',
			'IM',
			'IV',
		], {
			useNative: true,
			enumName: 'route_of_administration',
		});

		table.float('thresholdMg');
		table.float('lightMg');
		table.float('commonMg');
		table.float('strongMg');
		table.float('heavyMg');
		table.float('ld50MgPerKg');

		table
			.timestamp('updatedAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	return knex.schema.createTable('drugNames', table => {
		table
			.uuid('id')
			.primary()
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'));

		table
			.uuid('drugId')
			.references('id')
			.inTable('drugs')
			.notNullable();

		table
			.text('name')
			.notNullable();

		table.enum('type', [
			'COMMON',
			'SUBSTITUTIVE',
			'SYSTEMATIC',
		], {
			useNative: true,
			enumName: 'drugNameType',
		});
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('drugNames');
	await knex.schema.dropTableIfExists('drugDoses');
	await knex.schema.dropTableIfExists('drugs');
	return knex.schema.dropTableIfExists('drugClasses');
};
