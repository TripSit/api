import express from 'express';
import helmet from 'helmet';
import router from './router/index.js';
import defaultErrorHandler from './middleware/default-error-handler.js';

export default function createServer(deps) {
  const server = express();

  server.use(helmet());
  server.use(router(deps));
  server.use(defaultErrorHandler(deps));

  return server;
}
