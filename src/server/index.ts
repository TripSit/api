import express from 'express';
import helmet from 'helmet';
import router from './router';
import defaultErrorHandler from './middleware/default-error-handler';
import { Deps } from '../types';

export default function createServer(deps: Deps) {
	const server = express();

	server.use(helmet());
	server.use(router(deps));
	server.use(defaultErrorHandler(deps));

	return server;
};
