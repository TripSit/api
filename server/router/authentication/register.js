'use strict';

const yup = require('yup');
const validate = require('../../middleware/validate');
const User = require('../../../models/user');

module.exports = function registerRoute(router) {
	/**
	 * POST /user
	 * Registers a new user.
	 */
	router.post(
		'/user',

		validate(yup.object().shape({
			nick: yup.string().max(32).required(),
			password: yup.string().min(6).required(),
		}).required()),

		async (req, res) => User.create(req.body)
			.then(() => {
				res.sendStatus(201);
			})
			.catch((ex) => {
				if (!ex.message.includes('users_nick_unique')) return Promise.reject(ex);
				res.status(400).json({
					errors: {
						body: [{
							propertyPath: 'nick',
							message: 'Nick is already in use',
						}],
					},
				});
			}),
	);
};
