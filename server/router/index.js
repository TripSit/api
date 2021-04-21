import express from 'express';
import Router from 'express-promise-router';

export default function createRouter() {
  const router = Router();
  router.use(express.json());

  return router;
}
