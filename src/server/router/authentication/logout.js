'use strict';

const authenticated = require('../../middleware/authenticated');

module.exports = function logoutRoute(router) {
	router.post('/logout', authenticated(), async (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	});
};
