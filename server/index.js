import express from 'express';
import helmet from 'helmet';
import router from './router';
import defaultErrorHandler from './middleware/default-error-handler';

export default function createServer() {
  const server = express();

  server.use(helmet());
  server.use(router());
  server.use(defaultErrorHandler());

  return server;
}
