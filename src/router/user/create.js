'use strict';

const Joi = require('joi');
const argon = require('argon2');

module.exports = function createUserRoute({ db, validator }) {
  return [
    validator.body(Joi.object({
      nick: Joi.string()
        .min(2)
        .max(60)
        .required()
        .trim(),
      password: Joi.string().min(6).required(),
    }).required()),

    async (req, res) => {
      const user = await db.knex('users')
        .insert({
          nick: req.body.nick,
          password: await argon.hash(req.body.password),
        })
        .returning(['id', 'nick', 'createdAt'])
        .then(([record]) => record);

      res.status(201).json(user);
    },
  ];
};
