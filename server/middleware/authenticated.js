'use strict';

module.exports = function authenticatedMiddleware() {
	return (req, res, next) => {
		if (req.session.uid) next();
		else res.sendStatus(401);
	};
};
