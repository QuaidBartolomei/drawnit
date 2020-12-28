import express from 'express';
import { Server } from 'http';
import { initApp } from 'loaders/express.loader';
import request from 'supertest';
import { getAuth0Token } from 'utils/test.utils';

let token = '';
let expressServer: Server;
const app = express();

beforeAll(async () => {
  expressServer = initApp(app);
  token = await getAuth0Token();
});

afterAll(async () => {
  expressServer.close();
});

test('private route gives 401 error without access token', (done) => {
  request(app).get('/private').expect(401, done);
});
test('private route gives 200 code with access token', (done) => {
  request(app).get('/private').set('Authorization', token).expect(200, done);
});
