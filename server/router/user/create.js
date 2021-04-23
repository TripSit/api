'use strict';

const Joi = require('joi');

module.exports = function createUserRoute(router, { db, validator, logger }) {
  router.post(
    '/user',

    validator.body(Joi.object({
      nick: Joi.string().required().max(16),
      password: Joi.string().required().min(6),
      email: Joi.string().email(),
    }).required()),

    async (req, res) => db
      .insert(req.body)
      .returning('id', 'nick', 'email')
      .then(([newUser]) => {
        res.status(201).json(newUser);
      })
      .catch((ex) => {
        logger.error(ex);
        res.status(400).json({ errors: 'It dun broke' });
      }),
  );
};
