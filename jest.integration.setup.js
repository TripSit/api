'use strict';

module.exports = {
  testMatch: /\/tests\/.+\.spec\.js$/,
  setupFilesAfterEnv: ['<rootDir>/jest.integration.setup.js'],
};
