'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class Drug extends Model {
	static tableName = 'drugs';

	static relationMappings = {
		names: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'drug-name'),
			join: {
				from: 'drugs.id',
				to: 'drug_names.drugId',
			},
		},
		routesOfAdministration: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'drug-route-of-administration'),
			join: {
				from: 'drugs.id',
				to: 'drugRoutesOfAdministration.drugId',
			},
		},
		classes: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'drug-class'),
			join: {
				from: 'drugs.id',
				to: 'drugClasses.drugId',
			},
		},
	};
};
