import express from 'express';
import { initMemoryDB } from 'loaders/db.memory.loader';
import { initApp } from 'loaders/express.loader';
import { initSocketServer } from 'loaders/socket.loader';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer({
  binary: {
    version: '3.6.3',
  },
});

initMemoryDB(mongod);
let server = initApp(express(), () => {
  console.log('server is listening');
});
initSocketServer(server);
