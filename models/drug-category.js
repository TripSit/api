'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class DrugClass extends Model {
	static tableName = 'drugClasses';

	static relationMapping = {
		drug: {
			relation: Model.ManyToManyRelation,
			modelClass: path.join(__dirname, 'drug'),
			join: {
				from: 'drug_classes.id',
				to: 'drug.drug_class_id',
			},
		},
	};
};
