'use strict';

const { createTestServer } = require('./utils');

test('404 not found', async () => createTestServer()
	.get('/some/invalid/url')
	.send()
	.expect(404));
