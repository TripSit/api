'use strict';

const { UserInputError } = require('apollo-server-express');
const gql = require('graphql-tag');

exports.typeDefs = gql`
  extend type Query {
    user(params: UserQueryParams!): User
  }

  extend type Mutation {
    setUserBanStatus(params: UserQueryParams!, banStatus: Boolean!): User!
  }

  input UserQueryParams {
    id: UUID
    discordId: String
    nick: String
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

async function resolverUserQueryParams(params, User) {
  const paramValueCount = Object.values(params).reduce((acc, a) => (a ? acc + 1 : acc), 0);
  if (paramValueCount > 1) throw new UserInputError('Too many parameters provided');
  if (paramValueCount < 1) throw new UserInputError('Must provide one parameter for user lookup');
  const [k, v] = Object.entries(params).find(([k, v]) => v);
  return User.findOne({ [k]: v });
}

exports.resolver = {
  Query: {
    async user(root, { params }, { dataSources }) {
      return resolverUserQueryParams(params, dataSources.db.User);
    },
  },
  Mutation: {
    async setUserBanStatus(root, { params, banStatus }, { dataSources }) {
      const user = await resolverUserQueryParams(params, dataSources.db.User);
      if (!user) throw new UserInputError('No user with provided ID found');
      if (!banStatus && user.banned) throw new UserInputError('User is already banned');
      if (banStatus && !user.banned) throw new UserInputError('User is not banned');
      user.banned = banStatus;
      await user.save();
      return user;
    },
  },
};
