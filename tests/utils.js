'use strict';

const supertest = require('supertest');
const knex = require('knex');
const knexConfig = require('../knexfile');
const createServer = require('../server');

exports.createTestServer = function createTestServer() {
	return supertest(createServer({
		db: knex(knexConfig),
		logger: {
			log: jest.fn(),
			info: jest.fn(),
			warn: jest.fn(),
			error: jest.fn(),
		},
	}));
};
