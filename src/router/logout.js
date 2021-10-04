'use strict';

module.exports = function logoutRoute() {
  return [
    async (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
    },
  ];
};
