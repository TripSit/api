'use strict';

const supertest = require('supertest');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const createServer = require('../server');

const knex = Knex(knexConfig);
exports.knex = knex;

exports.createTestServer = function createTestServer() {
	return supertest(createServer({
		db: knex,
		logger: {
			log: jest.fn(),
			info: jest.fn(),
			warn: jest.fn(),
			error: jest.fn(),
		},
	}));
};
