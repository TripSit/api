'use strict';

const Database = require('./database');

module.exports = function createDataSources() {
	return {
		db: new Database(),
	};
};
