'use strict';

const supertest = require('supertest');
const knex = require('knex');
const knexConfig = require('../knexfile');
const createServer = require('../server');

module.exports = function setup() {
	return supertest(createServer({
		logger: {
			info: jest.fn(),
			error: jest.fn(),
		},
		db: knex(knexConfig),
	}))
		.set('Accepts', 'application/json');
};
