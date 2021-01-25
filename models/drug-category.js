'use strict';

const { Model } = require('objection');

module.exports = class DrugCategory extends Model {
	static tableName = 'drug_categories';
};
