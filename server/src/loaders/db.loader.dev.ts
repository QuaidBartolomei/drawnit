import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

export async function initMemoryDB(mongod: MongoMemoryServer) {
  mongoose.Promise = Promise
  const mongoUri = mongod.getUri()
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  await mongoose.connect(mongoUri, mongooseOpts)

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e)
      mongoose.connect(mongoUri, mongooseOpts)
    }
    console.log(e)
  })

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`)
  })
}
