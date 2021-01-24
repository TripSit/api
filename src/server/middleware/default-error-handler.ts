import { Request, Response, NextFunction } from 'express'

export default function createDefaultErrorHandler({ logger }: ServerDependencies) {
	return (err: Error, req: Request, res: Response, next: NextFunction): void => {
		if (res.headersSent) next(err);
		else {
			logger.error(err);
			res.sendStatus(500);
		}
	};
};
