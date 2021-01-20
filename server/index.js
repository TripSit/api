'use strict';

const express = require('express');
const router = require('./router');
const defaultErrorHandler = require('./middleware/default-error-handler');

module.exports = function createServer() {
	const server = express();

	server.use(router());
	server.use(defaultErrorHandler());

	return server;
};
