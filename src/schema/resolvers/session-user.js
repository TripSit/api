'use strict';

const { AuthenticationError } = require('apollo-server-express');

module.exports = function sessionUserResolver() {
  return next => async (
    parent,
    params,
    ctx,
    info,
  ) => {
    if (!ctx.userId) throw new AuthenticationError();
    const sessionUser = await ctx.dataSources.db.User({ id: ctx.userId });
    if (!sessionUser) throw new AuthenticationError();
    next(parent, params, { ...ctx, sessionUser }, info);
  };
};
