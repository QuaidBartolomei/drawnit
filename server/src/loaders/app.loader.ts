import { roomController } from 'controllers/room.controller'
import express, { Express, json, urlencoded } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import xssAdvanced from 'xss-advanced'

export const initApp = (app = express()): Express => {
  return app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(xssAdvanced())
    .use(mongoSanitize())
    .use('/', roomController)
}
