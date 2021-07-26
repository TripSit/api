'use strict';

module.exports = function applyLogoutRoute(router) {
  router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });
};
