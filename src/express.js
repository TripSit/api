'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const router = require('./router');
const { REDIS_PORT, SESSION_SECRET } = require('./env');

module.exports = function createExpressServer(deps) {
  const { logger } = deps;

  const app = express();
  app.use(helmet());
  app.use(cors());

  // Session store for user, not app authentication
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
  app.use('/api', router(deps));

  // Default error handler
  app.use((req, res, next, ex) => {
    if (res.headersSent) next(ex);
    else {
      logger.error(ex);
      res.sendStatus(500);
    }
  });

  return app;
};
