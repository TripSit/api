'use strict';

const {
  User,
  UserBan,
  UserNote,
  Drug,
  DrugName,
  DrugCategory,
} = require('@tripsit/db');

module.exports = function createDbDataSource() {
  return {
    User,
    UserBan,
    UserNote,
    Drug,
    DrugName,
    DrugCategory,
  };
};
