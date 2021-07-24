'use strict';

const { resolvers } = require('../user');

describe('Query', () => {
  describe('user', () => {
    const [, userResolver] = resolvers['Query.user'];

    test('Returns resolvedRecord', async () => expect(
      userResolver(null, { resolvedRecord: 'mockUser' }),
    ).toBe('mockUser'));
  });
});

describe('Mutation', () => {
  describe('updateUser', () => {
    const [, updateUser] = resolvers['Mutation.updateUser'];
    const mockUserSave = jest.fn();

    afterEach(() => {
      mockUserSave.mockReset();
    });

    test('Throws error if user does not exist', async () => expect(updateUser(null, {})).rejects
      .toThrow('No user exists with provided ID'));

    test('Successful update', async () => {
      await expect(updateUser(
        null,
        {
          resolvedRecord: {
            id: 'mockUserId',
            save: mockUserSave,
            banned: false,
          },
          updates: { banned: true },
        },
      )).resolves.toEqual({
        id: 'mockUserId',
        save: mockUserSave,
        banned: true,
      });
    });
  });
});
