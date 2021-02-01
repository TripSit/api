'use strict';

const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
	type User {
		id: ID!
		nick: String!
		createdAt: DateTime!
	}
`;

exports.resolvers = {};
