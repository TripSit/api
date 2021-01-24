import { Request, Response, NextFunction } from 'express';

const BEARER_PATTERN = /^Bearer\s/;

export default function authenticateMiddleare() {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (req.headers.authorization && BEARER_PATTERN.test(req.headers.authorization)) {
			const token = req.header('authentication');
			// TODO
		}
	};
};
