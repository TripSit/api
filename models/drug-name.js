'use strict';

const { Model } = require('objection');

module.exports = class DrugName extends Model {
	static get tableName() {
		return 'drug_names';
	}
};
