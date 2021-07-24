'use strict';

const { User } = require('@tripsit/db');
const Joi = require('joi');

module.exports = function applyLoginRoute(router, { validator }) {
  router.post(
    '/login',

    validator.body(Joi.object({
      nick: Joi.string().max(32).required(),
      password: Joi.string().required(),
    }).required()),

    async (req, res) => {
      const user = await User.findOne({ nick: req.body.nick });
      if (!user || !(await user.authorize(req.body.password))) res.sendStatus(401);
      else {
        req.session.uid = user.id;
        res.sendStatus(200);
      }
    },
  );
};
