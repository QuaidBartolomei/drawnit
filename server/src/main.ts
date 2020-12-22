import { initApp } from 'loaders/express.loader';
import { initDb } from 'loaders/db.loader';
import { initSocketServer } from 'loaders/socket.loader';
import env from 'utils/env.utils';
import express from 'express';
import path from 'path';

initDb(env.MONGO_ATLAS || '');
const app = express();
const server = initApp(app, () => {
  console.log('server is listening');
});
initSocketServer(server);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});
