'use strict';

const { Model } = require('objection');

module.exports = class DrugClass extends Model {
	static tableName = 'drug_classes';
};
