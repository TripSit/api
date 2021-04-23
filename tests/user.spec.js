'use strict';

const { request } = require('./utils');

describe('post /user', () => {
  test('can successfully register', async () => {
    const payload = await request()
      .post('/user')
      .send({
        nick: 'SevenCats',
        password: 'P@ssw0rd',
      })
      .expect(201)
      .then((res) => res.data);

    expect(payload).toStrictEqual({});
  });
});
