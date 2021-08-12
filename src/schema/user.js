'use strict';

const gql = require('graphql-tag');

exports.typeDefs = gql`
  extend type Query {
    users(params: UsersQueryInput): [User!]!
    user(userId: UUID!): User
  }

  extend type Mutation {
    createUser(user: CreateUserInput): User!
    addUserRole(userId: UUID!, role: String!): Void
    removeUserRole(userId: UUID!, role: String!): Void
  }

  type User {
    id: ID!
    nick: String!
    roles: [UserRole!]!
    createdAt: DateTime!
  }

  type UserRole {
    id: ID!
    name: String!
    description: String!
    createdAt: DateTime!
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

    async user(root, { userId }, { dataSources }) {
      return dataSources.db.user.find({ id: userId });
    },
  },

  Mutation: {
    async createUser(root, { user }, { dataSources }) {
      return dataSources.db.user.create(user);
    },

    async addUserRole(root, { userId, userRoleId }, { dataSources }) {
      const alreadyHasRole = await dataSources.db.knex('user_role_users')
        .where('user_id', userId)
        .where('user_role_id', userRoleId);
      if (alreadyHasRole) throw new Error('User already possesses role');
      return dataSources.db.knex('user_role_users')
        .insert({ userId, userRoleId });
    },

    async removeUserRole(root, { userId, userRoleId }, { dataSources }) {
      const alreadyHasRole = await dataSources.db.knex('user_role_users')
        .where('user_id', userId)
        .where('user_role_id', userRoleId);
      if (!alreadyHasRole) throw new Error('User does not process role');
      return dataSources.db.knex('user_role_users')
        .del()
        .where('user_id', userId)
        .where('user_role_id', userRoleId);
    },
  },

  User: {
    async roles(user, params, { dataSources }) {
      return dataSources.db
        .knex('user_roles')
        .innerJoin('user_role_users', 'user_roles.id', 'user_role_users.user_role_id')
        .innerJoin('users', 'user_role_users.user_id', 'users.id')
        .where('users.id', user.id)
        .then(userRoles => userRoles.map(userRole => userRole.name));
    },
  },
};
