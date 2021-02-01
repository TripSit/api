'use strict';

const express = require('express');
const { graphqlConnect } = require('apollo-server-express');
const createSchema = require('./schema');
const dataSources = require('./data-sources');

module.exports = function createApollo(deps) {
	const router = express.Router();
	router.use(express.json());

	router.use('/graphql', graphqlConnect({
		schema: createSchema(deps),
		context: () => ({}),
		dataSources: dataSources(deps),
	}));

	return router;
};
