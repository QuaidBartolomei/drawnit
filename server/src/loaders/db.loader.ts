import mongoose from 'mongoose'

export async function initDb(url: string) {
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'db connection error:'),
  )

  mongoose.connection.on('connected', () => {
    console.log('db connected')
  })

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
