import { ErrorRequestHandler } from 'express'
import { Deps } from '../../types';

export default function createDefaultErrorHandler({ logger }: Deps): ErrorRequestHandler {
	return (error, req, res, next): void => {
		if (res.headersSent) next(error);
		else if (error.name === 'UnauthorizedError') {
			logger.info('Unauthorized', error);
			res.sendStatus(401);
		} else {
			logger.error(error);
			res.sendStatus(500);
		}
	};
};
