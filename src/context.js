'use strict';

module.exports = function context({ req }) {
  return {
    appToken: req.get('Authorization')?.replace(/^Bearer\s/, '') || null,
    userSessionId: req.session?.userId,
  };
};
