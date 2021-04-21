import express from 'express';
import Router from 'express-promise-router';
import authentication from './authentication';

module.exports = function createRouter() {
  const router = Router();
  router.use(express.json());

  authentication(router);

  return router;
};
