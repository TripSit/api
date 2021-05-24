'use strict';

const path = require('path');

module.exports = {
	root: true,
	extends: [
		'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parserOptions: {
		project: path.resolve('./tsconfig.json'),
	},
	env: { node: true },
  rules: {
    'import/prefer-default-export': 0,
  },
	overrides: [
		{
			files: [
				'.eslintrc.js',
				'jest.config.js',
				'jest.setup.js',
			],
			parserOptions: {
				sourceType: 'script',
			},
			rules: {
				strict: [2, 'global'],
			},
		},
		{
			files: [
				'**/__tests__/*.ts',
				'**/__mocks__/*.ts',
				'tests/**/*.ts',
			],
			plugins: ['jest'],
			env: { 'jest/globals': true },
		},
	],
};
