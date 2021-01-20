'use strict';

const Yup = require('yup');
const argon2 = require('argon2');
const validate = require('../../middleware/validate');

module.exports = function registerRoute(router, { db }) {
	/**
	 * POST /register
	 * Registers a new user.
	 */
	router.post(
		'/register',

		validate(Yup.object().shape({
			nick: Yup.string().max(32).required(),
			password: Yup.string().min(6).required(),
		}).required()),

		async (req, res) => db('users').insert({
			nick: req.body.nick,
			password: await argon2.hash(req.body.password),
		})
			.catch((ex) => {
				if (!ex.message.includes('users_email_unique')) return Promise.reject(ex);
				res.status(400).json({
					errors: { nick: 'Nick is already in use' },
				});
			}),
	);
};
