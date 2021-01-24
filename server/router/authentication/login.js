'use strict';

const yup = require('yup');
const validate = require('../../middleware/validate');
const User = require('../../../models/user');

module.exports = function loginRoutes(router) {
	async function validateCredentials(req, res, next) {
		const user = await User.query().findOne({ nick: req.body.nick });
		if (await user.validatePassword(req.body.password)) next();
	}

	const nickValidator = yup.string().max(32).required();
	const passwordValidator = yup.string().min(6).required();

	/**
	 * POST /login
	 */
	router.post(
		'/login',

		validate(yup.object().shape({
			nick: nickValidator,
			password: passwordValidator,
		}).required()),

		validateCredentials,

		async (req, res) => {
			let uid;
			if (!uid) res.sendStatus(401);
			else {
				req.session.uid = uid;
				res.sendStatus(200);
			}
		},
	);

	/**
	 * POST /irc/login
	 * Authenticates a user authenticating via Oregeno IRCD
	 */
	router.post(
		'/irc/login',

		validate(yup.object().shape({
			accountName: nickValidator,
			passphrase: passwordValidator,
		}).required()),

		validateCredentials,

		async (req, res) => {
			res.json({
				success: true,
				accountName: req.body.accountName,
			});
		},
	);
};
