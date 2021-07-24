'use strict';

const context = require('../context');

test('Resolves session tokekn from bearer token', () => {
  const mockReqGet = jest.fn().mockReturnValue('Bearer ayyocookie');
  expect(context({
    req: { get: mockReqGet },
  })).toEqual({ sessionToken: 'ayyocookie' });
  expect(mockReqGet).toHaveBeenCalledWith('Authorization');
});
