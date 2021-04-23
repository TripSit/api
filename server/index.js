'use strict';

const express = require('express');
const helmet = require('helmet');
const router = require('./router');
const defaultErrorHandler = require('./middleware/default-error-handler');

module.exports = function createServer(deps) {
  const server = express();

  server.use(helmet());
  server.use(router(deps));
  server.use(defaultErrorHandler(deps));

  return server;
};
