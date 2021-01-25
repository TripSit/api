'use strict';

const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
	extend type Query {
		drug(id: ID!): Drug!
	}

	type Drug {
		id: ID!
		name: String!
		summary: String!
		roa: [RouteOfAdministration!]!
		updatedAt: String!
		createdAt: String!
	}

	enum RouteOfAdministration {
		ORAL
		INSUFFLATION
		INHALATION
		RECTAL
		TOPICAL
		BUCCAL
		SI # Subcutanious injection
		IM # Intramuscular injection
		IV # Intravenious injection
	}
`;
