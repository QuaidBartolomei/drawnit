interface Env {
  AUTH0_AUDIENCE: string
  AUTH0_DOMAIN: string
  AUTH0_CLIENT_ID: string
  AUTH0_CLIENT_SECRET: string
  PORT: string
  NODE_ENV: 'production' | 'development' | string | undefined
  MONGO_DB_URI: string
  HOST: string
}

const env: Partial<Env> = { PORT: '4000', ...process.env }

export default env
