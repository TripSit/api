'use strict';

const { DataSource } = require('apollo-datasource');
const { initializeDatabase, ...models } = require('../../../models');

module.exports = class Database extends DataSource {
	constructor() {
		super();
		Object.assign(this, models);
	}
};
