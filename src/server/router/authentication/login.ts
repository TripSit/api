import { Request, Router } from 'express';
import argon2 from 'argon2';
import Joi from 'joi';
import { Deps } from '../../../types';

type SessionReq = Request & {
	session: {
		uid: string;
	};
};

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
				(req as SessionReq).session.uid = uid;
				res.sendStatus(200);
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
