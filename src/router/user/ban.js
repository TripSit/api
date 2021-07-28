'use strict';

const { UserNote } = require('@tripsit/db');
const Joi = require('joi');

module.exports = function applyUserBanRoute(router, { validator }) {
  router.post(
    '/user/:id/ban',

    // TODO: Check priviledges / authentication

    validator.params(Joi.object({
      id: Joi.string().uuid().required(),
    }).required()),

    async (req, res) => {
      return UserBan.insert(req.body);
    },
  );
};
