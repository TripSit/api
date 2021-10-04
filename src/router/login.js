'use strict';

const Joi = require('joi');

module.exports = function loginRoute({ db, validator }) {
  return [
    validator.body(Joi.object({
      nick: Joi.string().required().trim(),
      password: Joi.string().required(),
    }).required()),

    async (req, res) => {
      const user = await db.user
        .find({ nick: req.body.nick })
        .select('id', 'nick', 'createdAt')
        .first();
      if (!user || !(await db.user.authenticate({ nick: req.body.nick }, req.body.password))) {
        res.status(401).send();
      } else {
        req.session.uid = user.id;
        res.json(user);
        db.knex('users')
          .update({ lastActive: Date.now() })
          .where({ id: user.id });
      }
    },
  ];
};
