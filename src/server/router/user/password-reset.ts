import { Router, Request } from 'express';
import Joi from 'joi';
import { Deps } from '../../../types';

interface PasswordResetRequest extends Request {
  params: {
    userId: string;
  };
}

export default function passwordResetRoutes(router: Router, { db, validator }: Deps): void {
  router.post(
    '/user/:userId/password-reset',

    validator.params(Joi.object({
      id: Joi.string().uuid().required(),
    }).required()),

    async (req: PasswordResetRequest, res) => {

    },
  );
}
