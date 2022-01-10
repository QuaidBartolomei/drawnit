import path from 'path'
import { static as serveStaticFiles } from 'express'
import favicon from 'serve-favicon'
import { initApp } from 'loaders/app.loader'
import { initDb } from 'loaders/db.loader'
import { initServer } from 'loaders/express.loader'
import { initSocketServer } from 'loaders/socket.loader'
import { deleteExpiredRooms } from 'models/room.model'
import env from 'utils/env.utils'

async function main() {
  await initDb(env.MONGO_DB_URI || '')

  const client = path.join(__dirname, '../../client/build')
  const staticPath = path.join(client, 'static')
  const faviconPath = path.join(client, 'favicon.ico')

  const app = initApp()

  app
    .use('/static', serveStaticFiles(staticPath))
    .use(favicon(faviconPath))
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
}

main()
  .then(() => {
    console.log('server is ready')
  })
  .catch((err) => {
    console.error(err)
  })
