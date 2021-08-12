'use strict';

const gql = require('graphql-tag');
const { minMaxResolver } = require('./resolvers');

exports.typeDefs = gql`
  extend type Query {
    drug(id: UUID!): Drug!
    drugs: [Drug!]!
  }

  extend type Mutation {
    createDrug(drug: DrugInput!): Void
    updateDrug(id: UUID!, drug: DrugInput!): Drug!
    deleteDrug(id: UUID!): Void
    deleteDrugRoa(id: UUID!): Void
  }

  input DrugInput {
    name: String!
  }

  type Drug {
    id: ID!
    name: String!
    aliases: [String!]
    summary: String
    psychonautwikiUrl: URL
    errowidExperiencesUrl: URL
    roas: [DrugRoa!]!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type DrugRoa {
    id: ID!
    route: Roa!

    doseThreshold: UnsignedFloat
    doseLight: UnsignedFloat
    doseCommon: UnsignedFloat
    doseStrong: UnsignedFloat
    doseHeavy: UnsignedFloat
    doseWarning: String

    durationTotal: MinMax
    durationOnset: MinMax
    durationComeup: MinMax
    durationPeak: MinMax
    durationOffset: MinMax
    durationAfterEffects: MinMax

    updatedAt: DateTime!
    createdAt: DateTime!
  }

  enum Roa {
    oral
    insufflated
    inhaled
    topical
    sublingual
    buccal
    rectal
    intramuscular
    intravenous
    subcutanious
    transdermal
  }
`;

exports.resolvers = {
  Query: {
    async drug(parent, { id }, { dataSources }) {
      return dataSources.db.knex('drugs')
        .where('id', id)
        .first();
    },

    async drugs(parent, params, { dataSources }) {
      return dataSources.db.drug.find();
    },
  },

  Mutation: {
    async createDrug(parent, { drug }, { dataSources }) {
      return dataSources.db.drug.create(drug);
    },

    async updateDrug(parent, { id, drug }, { dataSources }) {
      return dataSources.db.drug.update(id, drug);
    },

    async deleteDrug(parent, { id }, { dataSources }) {
      await dataSources.db.drug.delete(id);
    },

    async deleteDrugRoa(parent, { id }, { dataSources }) {
      await dataSources.db.drug.deleteRoa(id);
    },
  },

  Drug: {
    async aliases(drug, params, { dataSources }) {
      return dataSources.db.drug.aliases(drug.id);
    },

    async roas(drug, params, { dataSources }) {
      return dataSources.db.drug.roas(drug.id);
    },

    psychonautwikiUrl(drug) {
      return drug.psychonaughtwikiSlug
        ? `https://psychonaughtwiki.org/wiki/${drug.psychonaughtwikiSlug}`
        : null;
    },
  },

  DrugRoa: {
    durationTotal: minMaxResolver('durationTotal'),
    durationOnset: minMaxResolver('durationOnset'),
    durationComeup: minMaxResolver('durationComeup'),
    durationPeak: minMaxResolver('durationPeak'),
    durationOffset: minMaxResolver('durationOffset'),
    durationAfterEffects: minMaxResolver('durationAfterEffects'),
  },
};
