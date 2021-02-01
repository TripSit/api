'use strict';

const path = require('path');
const { Model } = require('objection');

// Route of Administration
module.exports = class Roa extends Model {
	static tableName = 'drugRoutesOfAdministration';

	static relationMappings = {
		drug: {
			relation: Model.BelongsToOneRelation,
			modelClass: path.join(__dirname, 'drug'),
			join: {
				from: 'drugRoutesOfAdministration.drugId',
				to: 'drug.id',
			},
		},
	};
};
