'use strict';

const { makeExecutableSchema } = require('@graphql-tools/schema');
const gql = require('graphql-tag');
const scalarsSchema = require('./scalars');
const userSchema = require('./user');
const drugSchema = require('./drug');

const partials = [scalarsSchema, userSchema, drugSchema]
  .map(schema => schema.typeDefs);

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
    typeDefs: [baseTypeDefs, ...partials],
    resolvers: {
      ...scalarsSchema.resolvers,
      ...drugSchema.resolvers,
      ...userSchema.resolvers,
      Query: {
        ...drugSchema.resolvers.Query,
        ...userSchema.resolvers.Query,
      },
      Mutation: {
        ...drugSchema.resolvers.Mutation,
        ...userSchema.resolvers.Mutation,
      },
    },
  });
};
