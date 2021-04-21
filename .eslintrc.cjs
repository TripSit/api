'use strict';

module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: { node: true },
  rules: {
    'prefer-destructuring': 0,
    'consistent-return': 0,
    'import/extensions': 0,
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      parserOptions: { sourceType: 'script' },
      rules: {
        strict: [2, 'global'],
      },
    },
    {
      files: [
        '**/__tests__/*.js',
        '**/__mocks__/*.js',
        'tests/**/*.spec.js',
        'jest.setup.js',
      ],
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      env: { 'jest/globals': true },
      rules: {
        'jest/no-hooks': 0,
        'jest/prefer-expect-assertions': 0,
        'jest/no-test-return-statement': 0,
        'jest/require-top-level-describe': 0,
        'jest/expect-expect': 0,
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
};
