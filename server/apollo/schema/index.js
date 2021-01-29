'use strict';

const { makeExecutableSchema } = require('@graphql-tools/schema');
const base = require('./base');
const drug = require('./drug');

module.exports = function createSchema() {
	return makeExecutableSchema([base, drug].reduce(
		(acc, { typeDefs, resolvers }) => ({
			typeDefs: acc.concat(typeDefs),
			resolvers: {
				...acc.resolvers,
				...resolvers,
				Query: {
					...acc.resolvers.Query,
					...resolvers,
				},
				Mutation: {
					...acc.resolvers.Mutation,
					...resolvers.Mutation,
				},
			},
		}),
		{
			typeDefs: [],
			resolvers: {
				Query: {},
				Mutation: {},
			},
		},
	));
};
