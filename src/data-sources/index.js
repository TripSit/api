'use strict';

const createDbDataSource = require('./db');

module.exports = function createDataSources({ db }) {
  return {
    db: createDbDataSource(db),
  };
};
