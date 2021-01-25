'use strict';

const { Model } = require('objection');

module.exports = class DrugDose extends Model {
	static tableName = 'drug_doses';
};
