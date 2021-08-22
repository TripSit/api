'use strict';

const gql = require('graphql-tag');
const { minMaxResolver } = require('./resolvers');

exports.typeDefs = gql`
  extend type Query {
    drug(id: UUID!): Drug!
    drugs(query: String): [Drug!]!
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
    articles: [Article!]!
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
    async drug(root, { id }, { dataSources }) {
      return dataSources.db.knex('drugs')
        .where('id', id)
        .first();
    },

    async drugs(root, { query }, { dataSources }) {
      const sqlQuery = dataSources.db.knex('drugs')
        .orderBy('name');
      if (!query) sqlQuery.where('name', 'like', query);
      return sqlQuery;
    },
  },

  Mutation: {
    async createDrug(root, { drug }, { dataSources }) {
      return dataSources.db.drug.create(drug);
    },

    async updateDrug(root, { id, drug }, { dataSources }) {
      return dataSources.db.drug.update(id, drug);
    },

    async deleteDrug(root, { id }, { dataSources }) {
      await dataSources.db.drug.delete(id);
    },

    async deleteDrugRoa(root, { id }, { dataSources }) {
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

    async articles(drug, params, { dataSources }) {
      return dataSources.db.drug.articles(drug.id);
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
