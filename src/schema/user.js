'use strict';

const gql = require('graphql-tag');
const argon2 = require('argon2');

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
      const query = dataSources.db('users')
        .select('*')
        .limit(50)
        .offset((params?.page || 0) * 50);
      if (params?.nick) query.where('nick', 'like', `%${params?.nick.trim()}%`);
      return query;
    },
  },

  Mutation: {
    async createUser(root, { user }, { dataSources }) {
      return dataSources.db('users')
        .insert({
          ...user,
          password: await argon2.hash(user.password),
        })
        .returning(['id', 'nick', 'createdAt'])
        .then(([newUser]) => newUser);
    },
  },
};
