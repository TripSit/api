'use strict';

const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const baseTypes = gql`
	type Query {
		_empty: Boolean
	}

	type Mutation {
		_empty: Boolean
	}
`;

module.exports = function createSchema() {
	return makeExecutableSchema({
		typeDefs: [baseTypes],
		resolvers: {
			Query: {},
			Mutation: {},
		},
	});
};
