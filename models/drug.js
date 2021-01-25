'use strict';

const { Model } = require('objection');

module.exports = class Drug extends Model {
	static get tableName() {
		return 'drugs';
	}
};
