import { initApp } from 'loaders/express.loader';
import { initDb } from 'loaders/db.loader';
import { initSocketServer } from 'loaders/socket.loader';
import env from 'utils/env.utils';
import express from 'express';
import path from 'path';

initDb(env.MONGO_DB_URI || '');
const app = express();
const server = initApp(app, () => {
  console.log('server is listening');
});
initSocketServer(server);

app.use('/static', express.static(path.join(__dirname, '../../client/build/static')));
app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../../client/build/'),
  });
});
