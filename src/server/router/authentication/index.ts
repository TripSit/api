import { Router } from 'express';
import login from './login';
import register from './register';

export default function authenticationRoutes(router: Router, deps: ServerDependencies) {
	login(router, deps);
	register(router, deps);
};
