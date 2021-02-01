'use strict';

const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
	extend type Mutation {
		submitArticle(article: SubmitArticleInput!): Boolean
	}

	input SubmitArticleInput {
		title: String!
	}

	type Article {
		id: ID!
		title: String!
		author: String!
		summary: String
		publishedAt: DateTime
		createdAt: DateTime! # In reference to DB record
	}
`;

exports.resolvers = {
	Mutation: {
		async submitArticle(root, args, ctx) {
			return null;
		},
	},
};
