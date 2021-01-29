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
		# Durations measured in seconds
		onset: DrugDurationRange
		peak: DrugDurationRange
		offset: DrugDurationRange
		afterEffects: DrugDurationRange
		updatedAt: DateTime!
	}

	enum RouteOfAdministration {
		ORAL
		INSUFFLATION
		INHALATION
		RECTAL
		TOPICAL
		SUBLINGUAL
		BUCCAL
		SC # Subcutanious injection
		IM # Intramuscular injection
		IV # Intravenious injection
	}

	type DrugDurationRange {
		min: UnsignedInt
		max: UnsignedInt
	}
`;

exports.resolvers = {
	Query: {
		async drug(_, { id }, { dataSources }) {
			return dataSources.db.Drug.query().findOne({ id });
		},
	},

	Drug: {
		async roas(drug, args, { dataSources }) {
			return dataSources.db.DrugClass.query().find({ drugId: drug.id });
		},
	},
};
