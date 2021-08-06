'use strict';

const { ApolloServer } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache').default;
const createExpressServer = require('./express');
const createSchema = require('./schema');
const dataSources = require('./data-sources');
const context = require('./context');
const { NODE_ENV, HTTP_PORT } = require('./env');

module.exports = async function createServer(deps) {
  const server = new ApolloServer({
    context,
    schema: createSchema(),
    dataSources: () => dataSources(deps),
    plugins: [responseCachePlugin()],
    connectToDevTools: NODE_ENV !== 'production',
  });
  await server.start();

  const app = createExpressServer(deps);
  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  return new Promise((resolve) => {
    app.listen({ port: HTTP_PORT }, () => resolve({ server, app }));
  });
};
