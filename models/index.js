'use strict';

const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile');

exports.User = require('./user');

exports.initializeDatabase = function initializeDatabase() {
	const knex = Knex(knexConfig);
	Model.knex(knex);
	return knex;
};
