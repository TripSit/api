'use strict';

const { expressYupMiddleware } = require('express-yup-middleware');

module.exports = function validateMiddleware(yupSchema, on = 'body') {
	return expressYupMiddleware({
		schemaValidator: {
			schema: {
				[on]: {
					yupSchema,
					validateOptions: { abortEarly: false },
				},
			},
		},
	});
};
