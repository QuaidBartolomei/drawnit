import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from 'middleware/auth.middleware';
import env from 'utils/env.utils';
import { roomController } from 'controllers/room.controller';
import { Server } from 'http';

export const initApp = (
  app = express(),
  callback?: () => void
): Server => {
  return app
    .use(cors())
    .use(bodyParser.json())
    .use('/', roomController)
    .get('/private', authMiddleware, (req, res) => {
      res.send('Hello Auth World!');
    })
    .listen(env.PORT, callback);
};
