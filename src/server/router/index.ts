import express, { Router } from 'express';
import PromiseRouter from 'express-promise-router';
import jwt from 'express-jwt';
import authentication from './authentication';
import { Deps } from '../../types';
import { AUTH_TOKEN_SECRET } from '../../env';

export default function createRouter(deps: Deps): Router {
	const router = PromiseRouter();

	router.use(express.json());
	router.use(jwt({
		algorithms: ['HS256'],
		secret: AUTH_TOKEN_SECRET,
	}));

	authentication(router, deps);

	return router;
}
