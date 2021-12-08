import { MongoMemoryServer } from 'mongodb-memory-server'
import config from './config'

export = async function globalTeardown() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance = (global as { __MONGOINSTANCE?: MongoMemoryServer })
      .__MONGOINSTANCE
    if (!instance)
      return console.error('global mongo memory server instance not found')
    await instance.stop()
  }
}
