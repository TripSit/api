'use strict';

module.exports = function minMaxResolver(name) {
  return parent => ({
    min: parent[`${name}Min`],
    max: parent[`${name}Max`],
  });
};
