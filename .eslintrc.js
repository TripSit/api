'use strict';

module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    node: true,
  },
  rules: {
    strict: [2, 'global'],
    'no-console': [2, 'error', 'warn', 'info'],
    'arrow-parens': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
