import axios from 'axios';
import env from 'utils/env.utils';
import jwt from 'express-jwt';
import JwksRsa from 'jwks-rsa';

export async function getAuth0Token() {
  let url = `https://${env.AUTH0_DOMAIN}/oauth/token`;
  let data = {
    client_id: env.AUTH0_CLIENT_ID,
    client_secret: env.AUTH0_CLIENT_SECRET,
    audience: env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  };
  let res = await axios.post(url, data);
  return `${res.data.token_type} ${res.data.access_token}`;
}
export const authMiddleware = jwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.AUTH0_AUDIENCE,
  algorithms: ['RS256'],
});
