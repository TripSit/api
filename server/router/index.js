'use strict';

const express = require('express');
const Router = require('express-promise-router');
const applyUserRoutes = require('./user');

module.exports = function createRouter(deps) {
  const router = Router();
  router.use(express.json());

  applyUserRoutes(router, deps);

  return router;
};
