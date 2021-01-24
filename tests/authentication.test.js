'use strict';

const { createTestServer } = require('./utils');

describe('register', () => {
	it('requires a valid nick', async () => createTestServer()
		.post('/user')
		.expect('Content-Type', /application\/json/)
		.expect(400));
});
