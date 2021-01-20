'use strict';

const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex');
const router = require('./router');
const defaultErrorHandler = require('./middleware/default-error-handler');

module.exports = function createServer(deps) {
	const server = express();

	server.use(session({
		secret: process.env.SESSSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: new KnexSessionStore({ knex: deps.db }),
		cookie: {
			maxAge: 1200000,
			httpOnly: true,
			secure: process.env.SESSION_SECURE === 'true',
		},
	}));

	server.use(router(deps));
	server.use(defaultErrorHandler(deps));

	return server;
};
