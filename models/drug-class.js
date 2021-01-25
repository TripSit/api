'use strict';

const { Model } = require('objection');

module.exports = class DrugClass extends Model {
	static get tableName() {
		return 'drug_classes';
	}
};
