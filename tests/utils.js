'use strict';

const supertest = require('supertest');
const knex = require('knex');
const { createValidator } = require('express-joi-validation');
const knexConfig = require('../knexfile');
const createServer = require('../server');

exports.request = function request() {
  return supertest(createServer({
    db: knex(knexConfig),
    validator: createValidator(),
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
  }));
};
