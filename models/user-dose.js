'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class UserDose extends Model {
	static tableName = 'userDoses';

	static relationMappings = {
		user: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'user'),
			join: {
				from: 'userDoses.userId',
				to: 'users.id',
			},
		},
		drug: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'drug'),
			join: {
				from: 'userDoses.drugId',
				to: 'drugs.id',
			},
		},
	};
};
