'use strict';

const { ForbiddenError } = require('apollo-server-express');
const gql = require('graphql-tag');

exports.typeDefs = gql`
  extend type Query {
    users(query: String): [User!]!
    user(userId: UUID!): User
    userRoles: [UserRole!]!
    noteTypes: [UserNoteType!]!
  }

  extend type Mutation {
    createUser(user: CreateUserInput): User!
    addUserRole(userId: UUID!, role: String!): UserRole!
    removeUserRole(userId: UUID!, role: String!): Void
    addUserNote(note: CreateUserNoteInput!): UserNote!
    removeUserNote(noteId: UUID!): Void
  }

  type User {
    id: ID!
    nick: String!
    roles: [UserRole!]!
    notes: [UserNote!]!
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
    content: String!
    type: UserNoteType!
    issuedBy: User!
    createdAt: DateTime!
  }

  enum UserNoteType {
    ban
    quiet
    warning
    generic
  }

  input CreateUserInput {
    nick: String!
    password: String!
  }

  input UsersQueryInput {
    page: UnsignedInt
    nick: String
  }

  input CreateUserNoteInput {
    content: String!
    type: UserNoteType!
  }
`;

exports.resolvers = {
  Query: {
    async users(root, { query }, { dataSources }) {
      const sqlQuery = dataSources.db.knex('users')
        .orderBy('nick');
      if (query) sqlQuery.where('nick', 'like', query);
      return sqlQuery;
    },

    async user(root, { userId }, { dataSources }) {
      return dataSources.db.user.find({ id: userId });
    },

    async userRoles(root, params, { dataSources }) {
      return dataSources.db.knex('user_roles')
        .orderBy('name');
    },

    noteTypes() {
      return [
        'ban',
        'quiet',
        'warning',
        'generic',
      ];
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
        .insert({ userId, userRoleId })
        .returning('*')
        .then(([userRole]) => userRole);
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

    async createUserNote(root, { note }, { dataSources, userSessionId }) {
      return dataSources.db
        .knex('user_notes')
        .insert({
          ...note,
          issuedBy: userSessionId,
        })
        .returning('*')
        .then(([record]) => record);
    },

    async removeUserNote(root, { noteId }, { dataSources }) {
      await dataSources.db
        .knex('user_notes')
        .where('id', noteId)
        .update('deleted', true);
    },
  },

  User: {
    async roles(user, params, { dataSources }) {
      return dataSources.db
        .knex('user_roles')
        .innerJoin('user_role_users', 'user_roles.id', 'user_role_users.user_role_id')
        .innerJoin('users', 'user_role_users.user_id', 'users.id')
        .where('users.id', user.id);
    },

    async notes(user, params, { dataSources }) {
      return dataSources.db
        .knex('user_notes')
        .where('user_id', user.id)
        .where('deleted', false);
    },
  },

  UserNote: {
    async issuedBy(note, params, { dataSources }) {
      return dataSources.db
        .knex('users')
        .where('id', note.issuedBy)
        .first();
    },
  },
};
