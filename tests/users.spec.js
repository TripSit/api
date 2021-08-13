'use strict';

const gql = require('fake-tag');
const { createClient } = require('./utils');

describe('Query', () => {
  describe('users', () => {
    test('Returns all results when provided with no parameters', async () => {
      const { query } = createClient();
      const res = await query(gql`
        query AllUsers {
          users {
            id
            nick
          }
        }
      `);
      expect(res).toEqual({
        data: {
          users:
        },
      });
    });

    test.skip('Returns result that match the provided nick parameter');
  });

  describe('user', () => {
    test.skip('Returns user by ID');
  });

  describe('userRoles', () => {
    test.skip('Returns all available roles ordered by name');
  });

  describe('noteTypes', () => {
    test.skip('Returns all note types (static)');
  });
});

describe('Mutation', () => {
  describe('createUser', () => {
    test.skip('Creates a user');
  });

  describe('addUserRole', () => {
    test.skip('Throws error if user already has role');

    test.skip('Assigns role to user');
  });

  describe('removeUserRole', () => {
    test.skip('Throws error if user does not posses role');

    test.skip('Removes user role');
  });

  describe('createUserNote', () => {
    test.skip('Creates a new note');
  });

  describe('removeUserNote', () => {
    test.skip('Remove user role');
  });
});

describe('User', () => {
  describe('roles', () => {
    test.skip('Gets all user roles associated with a user');
  });

  describe('notes', () => {
    test.skip('Gets all associated notes');
  });
});

describe('UserNote', () => {
  test.skip('Gets associated user that issued the note');
});
