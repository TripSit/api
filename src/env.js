'use strict';

require('dotenv').config();
const path = require('path');

exports.NODE_ENV = process.env.NODE_ENV;
exports.HTTP_PORT = parseInt(process.env.HTTP_PORT, 10);
exports.REDIS_PORT = parseInt(process.env.REDIS_PORT, 10);
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.LOG_PATH = path.resolve(process.env.LOG_PATH);
