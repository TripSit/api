'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');
const router = require('./router');
const { NODE_ENV, SESSION_SECRET } = require('./env');

const KnexSessionStore = connectSessionKnex(session);

module.exports = function createExpressServer(deps) {
  const { db, logger } = deps;

  const app = express();
  app.use(helmet());
  app.use(cors());

  // Session store for user, not app authentication
  app.use(session({
    store: new KnexSessionStore({ knex: db.knex }),
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === 'production',
    },
  }));

  // Apply routes
  app.use('/api', router(deps));

  // Default error handler
  app.use((ex, req, res, next) => {
    if (res.headersSent) next(ex);
    else {
      logger.error(ex);
      res.sendStatus(500);
    }
  });

  return app;
};
