import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from 'middleware/auth.middleware';
import env from 'utils/env.utils';
import { roomController } from 'controllers/room.controller';
import { Server } from 'http';
import xssAdvanced from 'xss-advanced';
import mongoSanitize from 'express-mongo-sanitize';

export const initApp = (app = express(), callback?: () => void): Server => {
  return app
    .use(cors())
    .use(bodyParser.json())
    .use(xssAdvanced())
    .use(mongoSanitize())
    .use('/', roomController)
    .get('/private', authMiddleware, (req, res) => {
      res.send('Hello Auth World!');
    })
    .listen(env.PORT, callback);
};
