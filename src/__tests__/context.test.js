'use strict';

const context = require('../context');

test('Resolves app token from bearer token', () => {
  const mockReqGet = jest.fn().mockReturnValue('Bearer ayyocookie');
  expect(context({
    req: {
      get: mockReqGet,
    },
  })).toEqual({ appToken: 'ayyocookie' });
  expect(mockReqGet).toHaveBeenCalledWith('Authorization');
});
