'use strict';

const { Model } = require('objection');
const argon2 = require('argon2');

module.exports = class User extends Model {
	static get tableName() {
		return 'users';
	}

	static async create({ password, ...xs }) {
		return User.query().insert({
			...xs,
			passwordHash: argon2.hash(password),
		});
	}

	async verifyPassword(password) {
		return argon2.verify(this.passwordHash, password);
	}
};
