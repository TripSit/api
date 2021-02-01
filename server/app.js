'use strict';

const express = require('express');
const router = require('./router');
const defaultErrorHandler = require('./middleware/default-error-handler');

module.exports = function createExpressApp(deps) {
	const app = express();

	app.use(router(deps));
	app.use(defaultErrorHandler(deps));

	return app;
};
