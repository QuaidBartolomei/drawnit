import dotenv from 'dotenv';
dotenv.config();

type Env = {
  DB_URL: string;
  AUTH0_AUDIENCE: string;
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
  HOST: string;
  PORT: string;
  NODE_ENV: string;
  MONGO_ATLAS: string;
};

const {
  DB_URL,
  AUTH0_AUDIENCE,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  HOST,
  PORT,
  NODE_ENV,
  MONGO_ATLAS,
} = process.env;

const env = {
  DB_URL,
  AUTH0_AUDIENCE,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  HOST,
  PORT,
  MONGO_ATLAS,
};

export default env;
