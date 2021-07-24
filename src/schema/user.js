'use strict';

const { UserInputError } = require('apollo-server-express');
const gql = require('graphql-tag');
const { resolveSingleParamResolver } = require('./resolvers');

exports.typeDefs = gql`
  extend type Query {
    user(params: UserQueryParams!): User
  }

  extend type Mutation {
    updateUser(searchParams: UserQueryParams!, updates: UserUpdates): User!
  }

  input UserQueryParams {
    id: UUID
    discordId: String
    nick: String
  }

  input UserUpdates {
    discordId: String
    nick: String
    role: UserRole
    banned: Boolean
    lastActive: DateTime
  }

  type User {
    id: ID!
    discordId: String
    nick: String!
    role: UserRole!
    banned: Boolean!
    lastActive: DateTime!
    createdAt: DateTime!
  }

  enum UserRole {
    USER
    ALUMINI
    CONTRIBUTOR
    TRIPSITTER
    MODERATOR
    OPERATOR
    FOUNDER
  }
`;

exports.resolvers = {
  'Query.user': [resolveSingleParamResolver, (root, { resolvedRecord: user }) => user],

  'Mutation.updateUser': [resolveSingleParamResolver, async (root, { resolvedRecord: user, updates }) => {
    if (!user) throw new UserInputError('No user exists with provided ID');
    Object.assign(user, updates);
    await user.save();
    return user;
  }],
};
