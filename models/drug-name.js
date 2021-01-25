'use strict';

const { Model } = require('objection');

module.exports = class DrugName extends Model {
	static tableName = 'drug_names';
};
