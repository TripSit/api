import { json, Router } from 'express';
import PromiseRouter from 'express-promise-router';
import authentication from './authentication';
import { Deps } from '../../types';

export default function createRouter(deps: Deps): Router {
	const router = PromiseRouter();

	router.use(json());
	authentication(router, deps);

	return router;
};
