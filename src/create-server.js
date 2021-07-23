'use strict';

const { ApolloServer } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const express = require('express');
const helmet = require('helmet');
const createSchema = require('./schema');
const dataSources = require('./data-sources');
const context = require('./context');
const { HTTP_PORT } = require('./env');

module.exports = async function createServer({ logger }) {
  const server = new ApolloServer({
    context,
    schema: createSchema(),
    dataSources: () => dataSources({ logger }),
    plugins: [responseCachePlugin()],
  });
  server.start();

  const app = express();
  app.use(helmet());
  app.use(express.json());
  server.applyMiddleware({ app });

  return new Promise((resolve) => {
    app.listen({ port: HTTP_PORT }, () => resolve({ server, app }));
  });
};
