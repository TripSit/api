'use strict';

const { User } = require('../../../models');

module.exports = function loginRoutes(router) {
	/**
	 * POST /login
	 * Authenticates a user authenticating via Oregeno IRCD
	 */
	router.post('/login', async (req, res) => {
		const user = await User.query().findOne({ nick: req.body.nick });
		if (await user.validatePassword(req.body.password)) {
			res.json({
				success: true,
				accountName: req.body.accountName,
			});
		} else res.sendStatus(401);
	});
};
