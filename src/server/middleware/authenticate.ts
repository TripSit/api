import { RequestHandler } from 'express';
import config from '../../config.json';

const BEARER_PATTERN = /^Bearer\s/;

export type AuthId = 'main-website';

export default function authenticateMiddleare(
  authIds: AuthId[] = [],
  blacklist = false,
): RequestHandler {
  return (req, res, next): void => {
    if (req.headers.authorization && BEARER_PATTERN.test(req.headers.authorization)) {
      const token = req.headers.authorization.replace(BEARER_PATTERN, '');
      const authToken = config.authTokens.find((a) => a.token === token);
      if (authToken && !authIds.length) return next();
      const exists = authIds.includes(authToken?.id as AuthId);
      if ((blacklist && !exists) || (!blacklist && exists)) return next();
    }
    res.sendStatus(401);
    return undefined;
  };
};
