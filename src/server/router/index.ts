import { json, Router } from 'express';
import PromiseRouter from 'express-promise-router';
import authentication from './authentication';

export default function createRouter(deps: ServerDependencies): Router {
	const router = PromiseRouter();

	router.use(json());
	router.post

	authentication(router, deps);

	return router;
};
