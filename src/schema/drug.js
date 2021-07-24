'use strict';

const { UserInputError } = require('apollo-server-express');
const gql = require('graphql-tag');
const { User } = require('../../../db/lib');

exports.typeDefs = gql`
  extend type Query {
    drugs(params: DrugsSearchParams!): [Drug]!
  }

  input DrugsSearchParams {
    id: String
    name: String
  }

  type Drug {
    id: ID!
    summary: String
    updatedAt: String!
    createdAt: String!
  }
`;

async function resolveDrugQuery(params, Model) {
  const paramValueCount = Object.values(params).reduce((acc, a) => (a ? acc + 1 : acc), 0);
  if (paramValueCount > 1) throw new UserInputError('Too many parameters');
  if (paramValueCount < 1) throw new UserInputError('Must provide one parameter');
  const [k, v] = Object.entries(params).find(([, a]) => a);
  return Model.findOne({ [k]: v }).then(record => record || null);
}

exports.resolvers = {
  Query: {
    async drugs(root, { params }, ctx) {
      return ctx;
    },
  },
};
