'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class Role extends Model {
	static tableName = 'roles';

	static relationMappings = {
		users: {
			relation: Model.ManyToManyRelation,
			modelClass: path.join(__dirname, 'user'),
			join: {
				from: 'roles.id',
				through: {
					from: 'userRoles.roleId',
					to: 'userRoles.userId',
				},
				to: 'users.id',
			},
		},
	};
};
