'use strict';

const path = require('path');
const { config } = require('dotenv');

config();

exports.NODE_ENV = process.env.NODE_ENV;

exports.HTTP_PORT = parseInt(process.env.HTTP_PORT, 10);
exports.LOG_PATH = path.resolve(process.env.LOG_PATH);

exports.POSTGRES_HOST = process.env.POSTGRES_HOST;
exports.POSTGRES_USER = process.env.POSTGRES_USER;
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
exports.POSTGRES_DB = process.env.POSTGRES_DB;

exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.SESSION_SECURE = process.env.SESSION_SECURE === 'true';
