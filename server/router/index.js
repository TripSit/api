'use strict';

const express = require('express');
const Router = require('express-promise-router');
const authentication = require('./authentication');

module.exports = function createRouter() {
	const router = Router();
	router.use(express.json());

	authentication(router);

	return router;
};
