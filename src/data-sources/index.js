'use strict';

const createDbDataSource = require('./db');

module.exports = function createDataSources() {
  return {
    db: createDbDataSource(),
  };
};
