import { initApp } from 'loaders/app.loader'
import { initMemoryDB } from 'loaders/db.loader.dev'
import { initServer } from 'loaders/express.loader'
import { initSocketServer } from 'loaders/socket.loader'
import env from 'utils/env.utils'

async function main() {
  const app = initApp()
  const server = initServer(app, () => {
    console.log('server is listening on port:', env.PORT)
  })
  initSocketServer(server)
  await initMemoryDB()
  process.on('SIGTERM', () => process.exit())
}

main()
  .then(() => {
    console.log('server is ready')
  })
  .catch((err) => {
    console.error(err)
  })
