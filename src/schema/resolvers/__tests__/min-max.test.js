'use strict';

const minMaxResolver = require('../min-max');

test('Resolves correct key', () => {
  expect(minMaxResolver('pizza')({
    pizzaMin: 2,
    pizzaMax: 5,
  })).toEqual({
    min: 2,
    max: 5,
  });
});
