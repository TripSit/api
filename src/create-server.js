'use strict';

const { ApolloServer } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const createExpressServer = require('./express');
const createSchema = require('./schema');
const dataSources = require('./data-sources');
const context = require('./context');
const { HTTP_PORT } = require('./env');

module.exports = async function createServer(deps) {
  const server = new ApolloServer({
    context,
    schema: createSchema(),
    dataSources: () => dataSources(deps),
    plugins: [responseCachePlugin()],
  });
  await server.start();

  const app = createExpressServer(deps);
  server.applyMiddleware({ app });
  return new Promise((resolve) => {
    app.listen({ port: HTTP_PORT }, () => resolve({ server, app }));
  });
};
