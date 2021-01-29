'use strict';

const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile');

// Export models
exports.Drug = require('./drug');
exports.DrugClass = require('./drug-class');
exports.DrugDose = require('./drug-dose');
exports.DrugName = require('./drug-name');
exports.User = require('./user');

// Knex initialization
exports.initializeDatabase = function initializeDatabase() {
	const knex = Knex(knexConfig);
	Model.knex(knex);
	return knex;
};
