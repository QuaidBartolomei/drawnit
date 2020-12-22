import {  initApp } from 'loaders/express.loader';
import request from 'supertest';
import { Server } from 'http';
import express from 'express';

const TEST_ROUTE = '/test';
const app = express();
let expressServer: Server;

beforeAll(async () => {
  expressServer = initApp(app);
});

afterAll(async () => {
  expressServer.close();
});

test('Express app successfully listens when initApp is called', async (done) => {
  app.get(TEST_ROUTE, (req, res) => {
    res.status(200).send();
  });
  request(app).get(TEST_ROUTE).expect(200, done);
});
