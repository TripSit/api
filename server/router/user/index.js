'use strict';

const applyCreateUser = require('./create');

module.exports = function applyUser(router, deps) {
  applyCreateUser(router, deps);
};
