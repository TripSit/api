'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class DrugCategory extends Model {
	static tableName = 'drugCategories';

	static relationMapping = {
		drugs: {
			relation: Model.ManyToManyRelation,
			modelClass: path.join(__dirname, 'drug'),
			join: {
				from: 'drugCategories.id',
				to: 'drug.drugCateoryId',
			},
		},
	};
};
