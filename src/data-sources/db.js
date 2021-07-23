'use strict';

const { User, Drug } = require('@tripsit/db');

module.exports = function createDbDataSource() {
  return {
    User,
    Drug,
  };
};
