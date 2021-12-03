import { roomController } from 'controllers/room.controller'
import express, { Express } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import xssAdvanced from 'xss-advanced'

export const initApp = (app = express(), callback?: () => void): Express => {
  return app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(xssAdvanced())
    .use(mongoSanitize())
    .use('/', roomController)
}
