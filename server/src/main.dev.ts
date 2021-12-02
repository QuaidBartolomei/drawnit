import cors from 'cors'
import express from 'express'
import { initMemoryDB } from 'loaders/db.loader.dev'
import { initApp } from 'loaders/express.loader'
import { initSocketServer } from 'loaders/socket.loader'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer({
  binary: {
    version: '3.6.3',
  },
})

initMemoryDB(mongod)
const app = express()
app.use(cors())
const server = initApp(app, () => {
  console.log('server is listening')
})
initSocketServer(server)

process.on('SIGTERM', () => process.exit())
