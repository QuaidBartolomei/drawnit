import mongoose from 'mongoose'

interface ExtraConnectionConfig {
  dbName?: string
  createNewConnection?: boolean
  differentMongoose?: mongoose.Mongoose
}

// to not duplicate code
const staticOptions: mongoose.ConnectOptions = {
  autoIndex: true,
}
/**
 * Make a Connection to MongoDB
 */
export async function connect(
  extraConfig: ExtraConnectionConfig = {},
): Promise<mongoose.Connection> {
  const mongooseInstance: mongoose.Mongoose =
    extraConfig.differentMongoose ?? mongoose
  let connection: mongoose.Connection

  const options = { ...staticOptions }

  // to not duplicate code
  const connectionString = `${process.env.MONGO_URI}/jest`

  if (extraConfig.createNewConnection) {
    connection = await mongooseInstance
      .createConnection(connectionString, options)
      .asPromise()
  } else {
    await mongoose.connect(connectionString, options)
    connection = mongooseInstance.connection
  }

  return connection
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<void> {
  await mongoose.disconnect()
}

beforeAll(async () => {
  await connect()
})

afterAll(async () => {
  await disconnect()
})
