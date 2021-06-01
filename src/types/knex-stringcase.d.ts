import { Knex } from 'knex';

declare module 'knex-stringcase' {
  function knexStringcase(config: Knex.Config): Knex.Config;
  export = knexStringcase;
}
