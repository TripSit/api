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
		logger: console,
	}));
};
