import { Router } from 'express';
import login from './login';
import register from './register';
import { Deps } from '../../../types';

export default function authenticationRoutes(router: Router, deps: Deps) {
	login(router, deps);
	register(router, deps);
};
