'use strict';

const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { UnsignedFloatResolver, DateTimeResolver } = require('graphql-scalars');
const drug = require('./drug');

const baseTypes = gql`
	type Query {
		_empty: Boolean
	}

	type Mutation {
		_empty: Boolean
	}

	scalar UnsignedFloatResolver
	scalar DateTime
`;

module.exports = function createSchema() {
	return makeExecutableSchema({
		typeDefs: [baseTypes, drug.typeDefs],
		resolvers: {
			Query: {},
			Mutation: {},
			UnsignedFloat: UnsignedFloatResolver,
			DateTime: DateTimeResolver,
		},
	});
};
