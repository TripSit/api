'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class DrugName extends Model {
	static tableName = 'drugNames';

	static relationMappings = {
		drug: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'drug'),
			join: {
				from: 'drugNames.drugId',
				to: 'drugs.id',
			},
		},
	};
};
