'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class Drug extends Model {
	static tableName = 'drugs';

	static relationMappings = {
		names: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'drug-name'),
			join: {
				from: 'users.id',
				to: 'drug_names.drug_id',
			},
		},
		doses: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'drug-dose'),
			join: {
				from: 'users.id',
				to: 'drug_doses.drug_id',
			},
		},
		classes: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'drug-class'),
			join: {
				from: 'users.id',
				to: 'drug_classes.drug_id',
			},
		},
	};
};
