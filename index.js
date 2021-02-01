'use strict';

require('dotenv').config();
require('./db-init');
require('./yup-locale');
const createServer = require('./server');
const createLogger = require('./logger');

const logger = createLogger();

const server = createServer({ logger });

const port = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000;
server.listen(port, () => {
	logger.info(`TripSit API running on port ${port}`);
});
