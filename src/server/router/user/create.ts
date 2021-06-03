import { Router, Request, Response } from 'express';
import Joi from 'joi';
import argon2 from 'argon2';
import { Deps } from '../../../types';

interface CreateUserRequest extends Request {
  body: {
    nick: string;
    password: string;
    email?: string;
  };
}

export default function createUserRoute(router: Router, { db, validator }: Deps): void {
  router.post(
    '/user',

    validator.body(Joi.object({
      nick: Joi.string().max(26).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email(),
    }).required()),

    async (req: CreateUserRequest, res) => db('users').insert({
      nick: req.body.nick,
      password: await argon2.hash(req.body.password),
    })
      .catch((ex: Error) => {
        if (!ex.message.includes('users_email_unique')) return Promise.reject(ex);
        return res.status(400).json({
          errors: { nick: 'Nick is already in use' },
        });
      }),
  );
}
