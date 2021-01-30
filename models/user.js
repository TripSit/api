'use strict';

const path = require('path');
const { Model } = require('objection');
const argon2 = require('argon2');

module.exports = class User extends Model {
	static tableName = 'users';

	static relationMappings = {
		doses: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'user-dose'),
			join: {
				from: 'users.id',
				to: 'userDose.userId',
			},
		},
	};

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
