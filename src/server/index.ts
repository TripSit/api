import express from 'express';
import Knex from 'knex';
import { Logger } from 'winston';
import router from './router';
import defaultErrorHandlerMiddleware from './middleware/default-error-handler';

export default function createServer(deps: ServerDependencies) {
	const server = express();

	server.use(router(deps));
	server.use(defaultErrorHandlerMiddleeware(deps));

	return server;
};
