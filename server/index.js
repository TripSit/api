'use strict';

const express = require('express');
const router = require('./router');
const applyApollo = require('./apollo');
const defaultErrorHandler = require('./middleware/default-error-handler');

module.exports = function createServer(deps) {
	const server = express();

	server.use(router(deps));
	server.use(defaultErrorHandler(deps));

	return applyApollo(server);
};
