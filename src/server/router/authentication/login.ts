import { Router } from 'express';
import Yup from 'yup';
import argon2 from 'argon2';
import validate from '../../middleware/validate';

export default function loginRoutes(router: Router, { knex }: ServerDependencies) {
	async function validateCredentials(nick: string, password: string): Promise<string | null> {
		return knex('users')
			.select('id', 'password')
			.where('nick', nick)
			.then(({ id, password: hash }) => argon2.verify(hash, password)
				.then((isValid => (isValid ? id : null))));
	}

	const nickValidator = Yup.string().max(32).required();
	const passwordValidator = Yup.string().min(6).required();

	/**
	 * POST /user
	 */
	router.post(
		'/user',

		validate(Yup.object().shape({
			nick: nickValidator,
			password: passwordValidator,
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
	 * Authenticates a user authenticating via Oregeno IRCD
	 */
	router.post(
		'/irc/user',

		validate(Yup.object().shape({
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
