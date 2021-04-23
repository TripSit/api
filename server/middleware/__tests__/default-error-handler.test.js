'use strict';

const createDefaultErrorHandler = require('../default-error-handler');

const logger = { error: jest.fn() };

afterEach(() => {
  logger.error.mockReset();
});

test('calls next(err) if headers are alrady sent', () => {
  const next = jest.fn();
  const err = new Error('dun goofd');
  createDefaultErrorHandler({ logger })(err, {}, { headersSent: true }, next);
  expect(logger.error).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith(err);
});
