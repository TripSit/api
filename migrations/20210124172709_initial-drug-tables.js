'use strict';

exports.up = async function up(knex) {
	await knex.schema.createTable('categories', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.text('name')
			.unique()
			.notNullable();

		table
			.text('description')
			.notNullable();

		table.enum('type', ['PSYCHOACTIVE', 'CHEMICAL'], {
			useNative: true,
			enumName: 'drugClassType',
		});
	});

	await knex.schema.createTable('drugs', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

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

	await knex.schema.createTable('drugCategories', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.uuid('drugId')
			.notNullable()
			.references('drugs.id');

		table
			.uuid('categoryId')
			.notNullable()
			.references('categories.id');
	});

	await knex.schema.createTable('drugRoutesOfAdministration', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.uuid('drugId')
			.notNullable()
			.references('drugs.id');

		table.enum('route', [
			'ORAL',
			'INSUFFLATION',
			'INHALATION',
			'RECTAL',
			'TOPICAL',
			'SUBLINGUAL',
			'BUCCAL',
			'SC',
			'IM',
			'IV',
		], {
			useNative: true,
			enumName: 'routeOfAdministration',
		});

		// Doses
		table.float('threshold');
		table.float('light');
		table.float('common');
		table.float('strong');
		table.float('heavy');
		table.float('ld50MgPerKg');

		// Durations (TODO: make time deltas)
		table.integer('onsetMin').unsigned();
		table.integer('onsetMax').unsigned();
		table.integer('peakMin').unsigned();
		table.integer('peakMax').unsigned();
		table.integer('offsetMin').unsigned();
		table.integer('offsetMax').unsigned();
		table.integer('afterEffectsMin').unsigned();
		table.integer('afterEffectsMax').unsigned();

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('drugNames', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.uuid('drugId')
			.notNullable()
			.references('drugs.id');

		table.text('name').notNullable();

		table.enum('type', [
			'COMMON',
			'SUBSTITUTIVE',
			'SYSTEMATIC',
		], {
			useNative: true,
			enumName: 'drugNameType',
		});
	});

	await knex.schema.createTable('userDoses', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.uuid('userId')
			.notNullable()
			.references('users.id');

		table.uuid('drugId').references('drugs.id');

		table
			.uuid('drugRoaId')
			.notNullable()
			.refences('drugRoa.id');

		table.float('dose');
		table.text('rawEntry').notNullable();

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('articles', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table.text('title').notNullable();
		table.text('author');
		table.text('summary');
		table.timestamp('publishedAt');

		table
			.timestamp('createdAt')
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('drugArticles', table => {
		table
			.uuid('id')
			.notNullable()
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.primary();

		table
			.uuid('articleId')
			.notNullable()
			.references('articles.id');

		table
			.uuid('drugId')
			.notNullable()
			.references('drugs.id');
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('drugArticles');
	await knex.schema.dropTableIfExists('articles');
	await knex.schema.dropTableIfExists('userDoses');
	await knex.schema.dropTableIfExists('drugNames');
	await knex.schema.dropTableIfExists('drugRoutesOfAdministration');
	await knex.schema.dropTableIfExists('drugCategories');
	await knex.schema.dropTableIfExists('drugs');
	await knex.schema.dropTableIfExists('categories');
};
