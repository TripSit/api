'use strict';

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const gql = require('graphql-tag');
const scalars = require('./scalars');
const drug = require('./drug');

const components = [scalars, drug];

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
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
    typeDefs: [baseTypeDefs].concat(components.map(component => component.typeDefs)),
    resolvers: components
      .map(component => component.resolvers)
      .reduce((acc, resolvers) => composeResolvers(acc, resolvers), {
        Query: {},
        Mutation: {},
      }),
  });
};
