'use strict';

const { ApolloServer } = require('apollo-server-express');

module.exports = function applyApollo(app) {
	const apollo = new ApolloServer();

	apollo.applyMiddleware({ app });

	return apollo;
};
