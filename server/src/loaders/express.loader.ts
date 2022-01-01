import { Server } from 'http'
import { Express } from 'express'
import env from 'utils/env.utils'

export const initServer = (app: Express, callback?: () => void): Server =>
  app.listen(env.PORT, callback)
