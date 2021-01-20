'use strict';

const login = require('./login');
const register = require('./register');

module.exports = function authenticationRoutes(router, deps) {
	login(router, deps);
	register(router, deps);
};
