import { ErrorRequestHandler } from 'express'
import { Deps } from '../../types';

export default function createDefaultErrorHandler({ logger }: Deps): ErrorRequestHandler {
	return (err, req, res, next): void => {
		if (res.headersSent) next(err);
		else {
			logger.error(err);
			res.sendStatus(500);
		}
	};
};
