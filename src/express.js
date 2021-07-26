'use strict';

const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const createRouter = require('./router');
const { REDIS_PORT, SESSION_SECRET } = require('./env');

module.exports = function createExpressServer(deps) {
  const app = express();
  app.use(helmet());

  // Session store
  const SessionStore = connectRedis(session);
  app.use(session({
    store: new SessionStore({
      client: redis.createClient({ port: REDIS_PORT }),
    }),
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  }));

  // Apply routes
  app.use('/api', createRouter(deps));

  return app;
};
