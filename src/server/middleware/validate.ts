import { Request, Response, NextFunction } from 'express';
import Yup from 'yup';

export default function validateMiddleware(schema: Yup.AnySchema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		return schema.validate(req.method === 'GET' ? req.query : req.body)
			.then(() => {
				next()
			})
			.catch(err => {
				if (err.name !== 'ValidationError') return Promise.reject(err);
				res.status(400).json({ errors: err.errors });
			});
	};
};
