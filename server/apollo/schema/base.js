'use strict';

const { gql } = require('apollo-server-express');
const { UnsignedFloatResolver, UnsignedIntResolver, DateTimeResolver } = require('graphql-scalars');

exports.typeDefs = gql`
	type Query {
		_empty: Boolean
	}

	type Mutation {
		_empty: Boolean
	}

	scalar UnsignedFloat
	scalar UnsignedInt
	scalar DateTime
`;

exports.resolvers = {
	UnsignedFloat: UnsignedFloatResolver,
	UnsignedInt: UnsignedIntResolver,
	DateTime: DateTimeResolver,
};
