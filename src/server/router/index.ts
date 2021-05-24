import express, { Router } from 'express';
import PromiseRouter from 'express-promise-router';
import loginRoute from './user/login';
import logoutRoute from './user/logout';
import userCreateRoute from './user/create';
import { Deps } from '../../types';

export default function createRouter(deps: Deps): Router {
  const router = PromiseRouter();
  router.use(express.json());

  loginRoute(router, deps);
  logoutRoute(router, deps);
  userCreateRoute(router, deps);

  return router;
}
