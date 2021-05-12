import { Router } from 'express';
import Joi from 'joi';
import argon2 from 'argon2';
import { Deps } from '../../../types';

export default function registerRoute(router: Router, { db, validator }: Deps) {
	router.post(
		'/user',

		validator.body(Joi.object({
			nick: Joi.string().max(26).required(),
			password: Joi.string().min(6).required(),
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
}
