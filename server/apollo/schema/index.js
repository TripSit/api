'use strict';

const { makeExecutableSchema } = require('@graphql-tools/schema');
const base = require('./base');
const article = require('./article');
const drug = require('./drug');
const user = require('./user');

const components = [base, article, drug, user];

module.exports = function createSchema({ logger }) {
	const typeDefs = components
		.map(component => component.typeDefs)
		.reduce((acc, typeDef) => acc.concat(typeDef), []);

	const resolvers = components
		.map(component => component.resolvers)
		.reduce(
			(acc, { Query, Mutation, ...xs }) => ({
				...acc,
				...xs,
				Query: { ...acc.Query, ...xs.Query },
				Mutation: { ...acc.Mutation, ...xs.Mutation },
			}),
			{ Query: {}, Mutation: {} },
		);

	return makeExecutableSchema({
		typeDefs,
		resolvers,
		logger,
		allowUndefinedInResolve: false,
	});
};
