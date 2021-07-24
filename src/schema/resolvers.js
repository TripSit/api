'use strict';

const { UserInputError } = require('apollo-server-express');

exports.resolveSingleParamResolver = modelName => next => async (
  parent,
  { params, ...args },
  ctx,
  info,
) => {
  const Model = ctx.dataSources.db[modelName];
  if (!Model) throw new Error(`Could not find model '${modelName}'`);

  const valueCount = Object.values(params).reduce((acc, param) => (param ? acc + 1 : acc), 0);
  if (valueCount > 1) throw new UserInputError('Too many parameters provided');
  if (valueCount < 1) throw new UserInputError('Must provide one parameter');

  const [k, v] = Object.entries(params).find(([, a]) => a);
  const resolvedRecord = await Model.findOne({ [k]: v }).then(a => a || null);
  next(parent, { ...args, resolvedRecord }, ctx, info);
};
