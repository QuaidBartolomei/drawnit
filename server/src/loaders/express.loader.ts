import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from 'middleware/auth.middleware';
import env from 'utils/env.utils';
import { useRoomController } from 'controllers/room.controller';

export const initApp = (app = express(), callback?: () => void) => {
  return app
    .use(cors())
    .use(bodyParser.json())
    .use('/', useRoomController())
    .get('/private', authMiddleware, (req, res) => {
      res.send('Hello Auth World!');
    })
    .listen(env.PORT, callback);
};
