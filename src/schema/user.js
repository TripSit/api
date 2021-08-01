'use strict';

const gql = require('graphql-tag');

exports.typeDefs = gql`
  extend type Query {
    users(params: UsersQueryInput): [User!]!
  }

  extend type Mutation {
    createUser(user: CreateUserInput): User!
  }

  type User {
    id: ID!
    nick: String!
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

  type UserNote {
    id: ID!
    issuedBy: User!
    note: String!
    type: UserNoteType
    createdAt: DateTime!
  }

  enum UserNoteType {
    BAN
    QUIET
    WARNING
  }

  input CreateUserInput {
    nick: String!
    password: String!
  }

  input UsersQueryInput {
    page: UnsignedInt
    nick: String
  }
`;

exports.resolvers = {
  Query: {
    async users(root, { params }, { dataSources }) {
      return dataSources.db.user.find({ nick: params.nick });
    },
  },

  Mutation: {
    async createUser(root, { user }, { dataSources }) {
      return dataSources.db.user.create(user);
    },
  },
};
