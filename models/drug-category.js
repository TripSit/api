'use strict';

const { Model } = require('objection');

module.exports = class DrugCategory extends Model {
	static get tableName() {
		return 'drug_categories';
	}
};
