'use strict';

const Joi = require('joi');

module.exports = function applyLoginRoute(router, { db, validator }) {
  router.post(
    '/login',

    validator.body(Joi.object({
      nick: Joi.string().required().trim(),
      password: Joi.string().required(),
    }).required()),

    async (req, res) => {
      const user = await db.user.find({ nick: req.body.nick }).first();
      console.log(res);
      if (!user || !(await db.user.authenticate(req.body.nick, req.body.password))) {
        res.status(401).send();
      } else {
        req.session.uid = user.id;
        res.status(200).send();
      }
    },
  );
};
