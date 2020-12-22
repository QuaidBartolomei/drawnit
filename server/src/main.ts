import { initApp } from 'loaders/express.loader';
import { initDb } from 'loaders/db.loader';
import { initSocketServer } from 'loaders/socket.loader';
import env from 'utils/env.utils';
import express from 'express';

initDb(env.DB_URL || '');
let server = initApp(express(),()=>{console.log('server is listening')});
initSocketServer(server);
