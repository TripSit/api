export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('users', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.text('nick').notNullable().unique();
    table.specificType('passwordHash', 'CHAR(95)').notNullable();
    table.string('email', 320);
    table
      .boolean('isEmailVerified')
      .notNullable()
      .defaultTo(false);
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
}
