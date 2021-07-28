'use strict';

const { makeExecutableSchema } = require('@graphql-tools/schema');
const gql = require('graphql-tag');
const scalarsSchema = require('./scalars');
const userSchema = require('./user');

const partials = [scalarsSchema, userSchema];

const baseTypeDefs = gql`
  type Query {
    _empty: Void
  }

  type Mutation {
    _empty: Void
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
`;

module.exports = function createSchema() {
  return makeExecutableSchema({
    typeDefs: [baseTypeDefs].concat(partials.map(partial => partial.typeDefs)),
    resolvers: {
      ...scalarsSchema.resolvers,
      ...userSchema.resolvers,
      Query: {},
      Mutation: {
        ...userSchema.resolvers.Mutation,
      },
    },
  });
};
