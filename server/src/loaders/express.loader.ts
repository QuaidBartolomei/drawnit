import { Express } from 'express'
import { Server } from 'http'
import env from 'utils/env.utils'

export const initServer = (app: Express, callback?: () => void): Server => {
  return app.listen(env.PORT, callback)
}
