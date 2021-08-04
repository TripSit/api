'use strict';

module.exports = function applyLogoutRoute(router) {
  router.post('/logout', async (req, res) => {
    if (!req.session.uid) res.sendStatus(401);
    else {
      req.session.destroy();
      res.sendStatus(200);
    }
  });
};
