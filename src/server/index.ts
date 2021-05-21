import express from 'express';
import router from './router';
import defaultErrorHandler from './middleware/default-error-handler';
import { Deps } from '../types';

export default function createServer(deps: Deps) {
	const server = express();

	server.use(router(deps));
	server.use(defaultErrorHandler(deps));

	return server;
};
