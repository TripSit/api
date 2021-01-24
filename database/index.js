'use strict';

const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile');

module.exports = function createKnex() {
	const knex = Knex(knexConfig);
	Model.knex(knex);
	return knex;
};
