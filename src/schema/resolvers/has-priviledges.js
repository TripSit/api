'use strict';

const { ForbiddenError } = require('apollo-server-express');

module.exports = function hasPriviledgeResolver(role) {
  return next => (parent, params, ctx, info) => {
    if (!ctx.sessionUser.hasPriviledge(role)) throw new ForbiddenError();
    next(parent, params, ctx, info);
  };
};
