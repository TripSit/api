'use strict';

module.exports = function context({ req }) {
  return {
    sessionToken: req.get('Authorization').replace(/^Bearer\s/, '') || null,
  };
};
