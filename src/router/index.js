'use strict';

const express = require('express');
const Router = require('express-promise-router');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const createUserRoute = require('./user/create');
const changePasswordRoute = require('./user/change-password');

module.exports = function createRouter(deps) {
  const router = Router();
  router.use(express.json());

  router.post('/login', ...loginRoute(deps));
  router.post('/logout', ...logoutRoute(deps));

  router.post('/user', ...createUserRoute(deps));
  router.post('/user/:userId/change-password', ...changePasswordRoute(deps));

  return router;
};
