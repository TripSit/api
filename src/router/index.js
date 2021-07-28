'use strict';

const express = require('express');
const Router = require('express-promise-router');
const applyLoginRoute = require('./login');
const applyLogoutRoute = require('./logout');
const applyUserBanRoute = require('./user/ban');

module.exports = function createRouter(deps) {
  const router = Router();
  router.use(express.json());

  applyLoginRoute(router, deps);
  applyLogoutRoute(router, deps);
  applyUserBanRoute(router, deps);

  return router;
};
