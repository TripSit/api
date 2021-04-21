import * as Yup from 'yup';
import validate from '../middleware/validate';

export default function applyAuthenticationRoutes(router) {
  const authValidation = validate(Yup.object().shape({
    username: Yup.string().max(32).required(),
    password: Yup.string().min(6).required(),
  }).required());

  router.post('/user', authValidation, async (req, res) => {
    res.send('AYYYY');
  });

  router.post(
    '/login',

    // Conform Orgagono's request to our API
    async (req, res, next) => {
      if (req.body.accountName && req.body.passphrase) {
        req.body = {
          username: req.body.accountName,
          password: req.body.passphrase,
        };
      }
      next();
    },

    authValidation,

    async (req, res) => {
      res.send('Login!');
    },
  );
}
