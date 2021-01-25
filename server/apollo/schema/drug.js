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
		psychoactiveClass: DrugClass!
		chemicalClass: DrugClass!
		roas: [RouteOfAdministration!]!
		updatedAt: DateTime!
		createdAt: DateTime!
	}

	type DrugClass {
		id: ID!
		name: String!
		description: String!
	}

	type DrugRouteOfAdministration {
		id: ID!
		route: RouteOfAdministration!
		thresholdMg: UnsignedFloat
		lightMg: UnsignedFloat
		commonMg: UnsignedFloat
		strongMg: UnsignedFloat
		heavyMg: UnsignedFloat
		ld50MgPerKg: UnsignedFloat
		updatedAt: DateTime!
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
