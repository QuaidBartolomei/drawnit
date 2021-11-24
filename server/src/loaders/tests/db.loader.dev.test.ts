import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { initMemoryDB } from 'loaders/db.loader.dev'

const mongod = new MongoMemoryServer({
  binary: {
    version: '3.6.3',
  },
})
beforeAll(async () => {
  await initMemoryDB(mongod)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
})

describe('...', () => {
  it('...', () => {
    expect(mongoose.connection.readyState).toBe(1)
  })
})
