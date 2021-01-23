'use strict';

const setup = require('./setup');

let server;
beforeAll(() => {
	server = setup();
});

describe('Register', () => {
	it('requires a valid nick', async () => {
		return setup()
			.post('/user')
			.expect('Content-Type', 'application/json')
			.expect(400)
			.end((err, res) => {
				expect(err).toBe({});
			});
	});
});
