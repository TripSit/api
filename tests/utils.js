'use strict';

const supertest = require('supertest');
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile');
const createServer = require('../server');

const knex = Knex(knexConfig);
Model.knex(knex);

exports.knex = knex;

exports.createTestServer = function createTestServer() {
	return supertest(createServer({
		db: knex,
		logger: process.env.DEBUG ? console : {
			log: jest.fn(),
			info: jest.fn(),
			warn: jest.fn(),
			error: jest.fn(),
		},
	}));
};
