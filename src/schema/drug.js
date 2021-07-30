'use strict';

const gql = require('graphql-tag');
const { minMaxResolver } = require('./resolvers');

exports.typeDefs = gql`
  extend type Query {
    drug(id: UUID!): Drug
    drugs: [Drug!]
  }

  extend type Mutation {
    updateDrug(id: UUID!, updates: DrugUpates!): Drug!
  }

  input DrugUpates {
    name: String!
  }

  type Drug {
    id: ID!
    name: String!
    aliases: [String!]
    summary: String
    psychonautwikiUrl: URL!
    errowidExperiencesUrl: URL!
    roas: [DrugRoa!]!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type DrugAlias {
    id: ID!
    text: String!
  }

  type DrugRoa {
    id: ID!
    route: DrugRoute!

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

  enum DrugRoute {
    oral
    insufflated
    inhaled
    topical
    sublingual
    buccal
    rectal
    intramuscular
    intravenious
    subcutanious
    transdermal
  }
`;

exports.resolvers = {
  Query: {
    async drug(parent, { id }, { dataSources }) {
      return dataSources.db.knex('drugs')
        .where({ id })
        .first();
    },

    async drugs(parent, params, { dataSources }) {
      return dataSources.db.knex('drugs')
        .select('*')
        .orderBy('name', 'ASC');
    },
  },

  Mutation: {
    async updateDrug(parent, { id, updates }, { dataSources }) {
      return dataSources.db.knex('drugs')
        .update(updates)
        .where({ id })
        .returning('*')
        .then(([updatedDrug]) => updatedDrug);
    },
  },

  Drug: {
    async aliases(drug, params, { dataSources }) {
      return dataSources.db.knex('drug_aliases')
        .select('text')
        .where('drug_id', drug.id)
        .orderBy('text', 'ASC')
        .then(records => records.map(record => record.text));
    },

    async roas(drug, params, { dataSources }) {
      return dataSources.db.knex('drug_roas')
        .select('*')
        .where('drug_id', drug.id);
    },

    psychonautwikiUrl(drug) {
      return `https://psychonaughtwiki.org/wiki/${drug.psychonaughtwikiSlug}`;
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
