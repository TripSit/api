'use strict';

const Yup = require('yup');
const argon2 = require('argon2');
const validate = require('../../middleware/validate');

module.exports = function loginRoutes(router, { db }) {
	async function validateCredentials(nick, password) {
		return db('users')
			.select('id', 'password')
			.where('nick', nick)
			.then(({ id, password: hash }) => argon2.verify(hash, password)
				.then((isValid => (isValid ? id : null))));
	}

	/**
	 * POST /user
	 */
	router.post(
		'/user',

		validate(Yup.object().shape({
			nick: Yup.string().max(32).required(),
			password: Yup.string().min(6).required(),
		}).required()),

		validateCredentials,

		async (req, res) => {
			const uid = await validateCredentials(req.body.nick, req.body.password);
			if (!uid) res.sendStatus(401);
			else {
				req.session.uid = uid;
				res.sendStatus(200);
			}
		},
	);

	/**
	 * POST /irc/user
	 */
	router.post(
		'/irc/user',

		validate(Yup.object().shape({
			accountName: Yup.string().max(32).required(),
			passphrase: Yup.string().min(6).required(),
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
