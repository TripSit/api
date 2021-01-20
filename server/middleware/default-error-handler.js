'use strict';

module.exports = function createDefaultErrorHandler({ logger }) {
	return (err, req, res, next) => {
		if (res.headersSent) next(err);
		else {
			console.error(err);
			res.sendStatus(500);
		}
	};
};
