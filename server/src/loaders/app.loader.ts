import express, { Express, json, urlencoded } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import xssAdvanced from 'xss-advanced'
import { roomController } from 'controllers/room.controller'
import { cloudinaryController } from 'controllers/upload'
import env from 'utils/env.utils'

export const initApp = (app = express()): Express => {
  app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(xssAdvanced())
    .use(mongoSanitize())
    .use('/', roomController)
    .use('/', cloudinaryController)
  if (env.NODE_ENV !== 'production') {
    app.get('/ok', (req, res) => {
      res.sendStatus(200)
    })
  }
  return app
}
