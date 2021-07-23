'use strict';

const gql = require('graphql-tag');

exports.typeDefs = gql`
  extend type Query {
    drugs(query: DrugsQuery): [Drug]!
  }

  input DrugsQuery {
    name: String
  }

  type Drug {
    id: ID!
    summary: String
    updatedAt: String!
    createdAt: String!
  }
`;

exports.resolvers = {
  Query: {
    async drugs(root, { name }, ctx) {
      return ctx;
    },
  },
};
