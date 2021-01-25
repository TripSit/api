'use strict';

const { Model } = require('objection');

module.exports = class DrugDose extends Model {
	static get tableName() {
		return 'drug_doses';
	}
};
