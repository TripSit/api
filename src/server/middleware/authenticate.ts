import { RequestHandler } from 'express';

const BEARER_PATTERN = /^Bearer\s/;

export default function authenticateMiddleare(): RequestHandler {
	return (req, res, next): void => {
		if (req.headers.authorization && BEARER_PATTERN.test(req.headers.authorization)) {
			const token = req.header('authentication');
			// TODO
		}
	};
};
