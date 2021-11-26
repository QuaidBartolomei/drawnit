import { initApp } from 'loaders/express.loader'
import { initDb } from 'loaders/db.loader'
import { initSocketServer } from 'loaders/socket.loader'
import env from 'utils/env.utils'
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import { deleteExpiredRooms } from 'models/room.model'

initDb(env.MONGO_DB_URI || '')

const client = path.join(__dirname, '../../client/build')
const staticPath = path.join(client, 'static')
const faviconPath = path.join(client, 'favicon.ico')

const app = express()

const server = initApp(app, () => {
  console.log('server is listening')
})

app
  .use('/static', express.static(staticPath))
  .use(favicon(faviconPath))
  .get('*', (req, res) => {
    res.sendFile('index.html', {
      root: client,
    })
  })

initSocketServer(server)

setInterval(() => {
  deleteExpiredRooms()
}, 24 * 3600 * 1000)
