import config from './config'
import { Global } from './globalSetup'

export = function globalTeardown() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance = (global as Global).mongoInstance
    if (!instance)
      return console.error('global mongo memory server instance not found')
    return instance.stop()
  }
  return console.log('done')
}
