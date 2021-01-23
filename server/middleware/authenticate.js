'use strict';

const BEARER_PATTERN = /^Bearer\s/;

module.exports = function authenticateMiddleare() {
	return (req, res, next) => {
		if (req.headers.authorization && BEARER_PATTERN.test(req.headers.authorization)) {
			const token =
		}
	};
};
