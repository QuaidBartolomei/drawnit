import cors from 'cors'
import { static as serveStaticFiles } from 'express'
import { initApp } from 'loaders/app.loader'
import { initDb } from 'loaders/db.loader'
import { initServer } from 'loaders/express.loader'
import { initSocketServer } from 'loaders/socket.loader'
import { deleteExpiredRooms } from 'models/room.model'
import path from 'path'
import favicon from 'serve-favicon'
import env from 'utils/env.utils'

initDb(env.MONGO_DB_URI || '')

const client = path.join(__dirname, '../../client/build')
const staticPath = path.join(client, 'static')
const faviconPath = path.join(client, 'favicon.ico')

const app = initApp()

app
  .use(cors({ origin: env.HOST }))
  .use('/static', serveStaticFiles(staticPath))
  .use(favicon(faviconPath))
  .get('/ok', (req, res) => {
    res.sendStatus(200)
  })
  .get('*', (req, res) => {
    res.sendFile('index.html', {
      root: client,
    })
  })

const server = initServer(app, () => {
  console.log('server is listening')
})

initSocketServer(server)

setInterval(() => {
  deleteExpiredRooms()
}, 24 * 3600 * 1000)
