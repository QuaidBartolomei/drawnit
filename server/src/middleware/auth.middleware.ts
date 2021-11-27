import jwt from 'express-jwt'
import JwksRsa from 'jwks-rsa'
import env from 'utils/env.utils'

export const authMiddleware = jwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.AUTH0_AUDIENCE,
  algorithms: ['RS256'],
})
