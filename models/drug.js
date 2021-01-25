'use strict';

const { Model } = require('objection');

module.exports = class Drug extends Model {
	static tableName = 'drugs';
};
