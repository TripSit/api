import { Router } from 'express';
import Joi from 'joi';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Deps } from '../../../types';

export default function loginRoutes(router: Router, { db, validator }: Deps) {
	async function validateCredentials(nick: string, password: string): Promise<string | null> {
		return db('users')
			.select('id', 'password')
			.where('nick', nick)
			.first()
			.then(({ id, password: hash }) => argon2.verify(hash, password)
				.then((isValid => (isValid ? id : null))));
	}

	const nickValidator = Joi.string().max(32).required();
	const passwordValidator = Joi.string().min(6).required();

	/**
	 * General purpose authentication method. Use this one if unsure.
	 */
	router.post(
		'/login',

		validator.body(Joi.object({
			nick: nickValidator,
			password: passwordValidator,
		}).required()),

		async (req, res) => {
			const uid = await validateCredentials(req.body.nick, req.body.password);
			if (!uid) res.sendStatus(401);
			else {
				const accessToken = jwt.sign({ uid }, JWT_SECRET);
				res.json({ accessToken });
			}
		},
	);

	/**
	 * Authenticates a user authenticating via Oregeno IRCD
	 */
	router.post(
		'/irc/login',

		validator.body(Joi.object({
			accountName: nickValidator,
			passphrase: passwordValidator,
		}).required()),

		async (req, res) => {
			const uid = await validateCredentials(req.body.nick, req.body.password);
			if (!uid) res.sendStatus(401);
			else {
				res.json({
					success: true,
					accountName: req.body.accountName,
				});
			}
		},
	);
};
