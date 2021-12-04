import cors from 'cors'
import { initApp } from 'loaders/app.loader'
import { initMemoryDB } from 'loaders/db.loader.dev'
import { initServer } from 'loaders/express.loader'
import { initSocketServer } from 'loaders/socket.loader'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer({
  binary: {
    version: '3.6.3',
  },
})

initMemoryDB(mongod)
const app = initApp()
app.use(cors())
app.get('/test', (req, res) => {
  res.send(200)
})
const server = initServer(app, () => {
  console.log('server is listening')
})
initSocketServer(server)

process.on('SIGTERM', () => process.exit())
