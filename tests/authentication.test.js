'use strict';

const { knex, createTestServer } = require('./utils');

describe('register', () => {
	async function removeTestUsers() {
		return knex('users').del().where('nick', 'validUser');
	}

	beforeAll(removeTestUsers);
	afterAll(removeTestUsers);

	it('requires a valid nick and password', async () => createTestServer()
		.post('/user')
		.send()
		.expect('content-type', /application\/json/)
		.expect(400)
		.then(res => expect(res.body).toStrictEqual({
			errors: {
				body: [
					{
						propertyPath: 'nick',
						message: 'Required',
					},
					{
						propertyPath: 'password',
						message: 'Required',
					},
				],
			},
		})));

	it('nick cannot exceed 32 characters', async () => createTestServer()
		.post('/user')
		.send({
			nick: 'thisisanunreasonblylongnickoreganodoesnotsupportlol',
			password: 'P@ssw0rd',
		})
		.expect('content-type', /application\/json/)
		.expect(400)
		.then(res => expect(res.body).toStrictEqual({
			errors: {
				body: [{
					propertyPath: 'nick',
					message: 'nick must be at most 32 characters',
				}],
			},
		})));

	it('password cannot be less than 6 characters', async () => createTestServer()
		.post('/user')
		.send({
			nick: 'burgerbob',
			password: 'lol',
		})
		.expect('content-type', /application\/json/)
		.expect(400)
		.then(res => expect(res.body).toStrictEqual({
			errors: {
				body: [{
					propertyPath: 'password',
					message: 'password must be at least 6 characters',
				}],
			},
		})));

	it('can create a user', async () => {
		expect(await knex('users')).toStrictEqual([]);

		await createTestServer()
			.post('/user')
			.send({
				nick: 'validUser',
				password: 'P@ssw0rd',
			})
			.expect(201);

		const nickCount = await knex('users').where('nick', 'validUser').count();
		expect(nickCount).toBe(1);
	});

	it('hashes the password', async () => {
		const passwordCount = await knex('users').where('passwordHash', 'P@ssw0rd').count();
		expect(passwordCount).not.toBe('P@ssw0rd');
	});
});
