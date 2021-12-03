import { roomController } from 'controllers/room.controller'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import { Server } from 'http'
import env from 'utils/env.utils'
import xssAdvanced from 'xss-advanced'

export const initApp = (app = express(), callback?: () => void): Server => {
  const server = app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(xssAdvanced())
    .use(mongoSanitize())
    .use('/', roomController)
    .listen(env.PORT, callback)
  return server
}
