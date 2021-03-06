'use strict';

const express = require('express');
const Router = require('express-promise-router');
const authentication = require('./authentication');

module.exports = function createRouter(deps) {
	const router = Router();
	router.use(express.json());

	authentication(router, deps);

	router.use((req, res) => {
		res.sendStatus(404);
	});

	return router;
};
