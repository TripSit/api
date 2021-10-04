'use strict';

const Joi = require('joi');
const argon = require('argon2');

module.exports = function applyChangePasswordRoute({ db, validator }) {
  return [
    validator.params(Joi.object({
      userId: Joi.string().uuid().required(),
    }).required()),

    validator.body(Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi
        .string()
        .min(6)
        .disallow(Joi.ref('currentPassword'))
        .required(),
    }).required()),

    async (req, res) => {
      const { password } = await db.knex('users')
        .select('password')
        .where('id', req.params.id)
        .first();

      const isAuthenticated = await argon.verify(password, req.body.currentPassword);
      if (!isAuthenticated) res.status(401).send();
      else {
        await db.knex('users')
          .update({ password: await argon.hash(req.body.newPassword) })
          .where('id', req.params.id);
        res.status(200).send();
      }
    },
  ];
};
