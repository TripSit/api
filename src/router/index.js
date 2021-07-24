'use strict';

const express = require('express');
const Router = require('express-promise-router');
const applyLoginRoute = require('./login');

module.exports = function createRouter(deps) {
  const router = Router();
  router.use(express.json());

  applyLoginRoute(router, deps);

  return router;
};
