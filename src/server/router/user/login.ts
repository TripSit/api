import { Router, Request } from 'express';
import Joi from 'joi';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../env';
import { Deps } from '../../../types';

interface CredentialsRecord {
  id: string;
  password: string;
}

interface LoginRequest extends Request {
  body: {
    nick: string;
    password: string;
  };
}

interface IrcLoginRequest extends Request {
  body: {
    accountName: string;
    passphrase: string;
  };
}

export default function loginRoutes(router: Router, { db, validator }: Deps): void {
  async function validateCredentials(nick: string, password: string): Promise<string | null> {
    return db('users')
      .select('id', 'password')
      .where('nick', nick)
      .first()
      .then(({ id, password: hash }: CredentialsRecord) => argon2.verify(hash, password)
        .then<string | null>((isValid) => (isValid ? id : null)));
  }

  const nickValidator = Joi.string().max(32).required();
  const passwordValidator = Joi.string().min(6).required();

  /**
   * General purpose authentication method. Use this one if unsure.
   */
  router.post(
    '/login',

    validator.body(Joi.object({
      nick: nickValidator,
      password: passwordValidator,
    }).required()),

    async (req: LoginRequest, res) => {
      const uid = await validateCredentials(req.body.nick, req.body.password);
      if (!uid) res.sendStatus(401);
      else {
        const accessToken = jwt.sign({ uid }, JWT_SECRET);
        res.json({ accessToken });
      }
    },
  );

  /**
   * Authenticates a user authenticating via Oregeno IRCD
   */
  router.post(
    '/irc/login',

    validator.body(Joi.object({
      accountName: nickValidator,
      passphrase: passwordValidator,
    }).required()),

    async (req: IrcLoginRequest, res) => {
      const uid = await validateCredentials(req.body.accountName, req.body.passphrase);
      if (!uid) res.sendStatus(401);
      else {
        res.json({
          success: true,
          accountName: req.body.accountName,
        });
      }
    },
  );
}
