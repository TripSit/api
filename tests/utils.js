'use strict';

const createDb = require('@tripsit/db');
const { createTestClient } = require('apollo-server-integration-testing');
const { createValidator } = require('express-joi-validation');
const createServer = require('../src/create-server');

exports.db = createDb();

const apolloServer = createServer({
  logger: {
    error: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
  db: exports.db,
  validator: createValidator(),
});

exports.createClient = function createClient(args) {
  return createTestClient({ apolloServer, ...args });
};
