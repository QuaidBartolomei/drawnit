import express from 'express';
import { Server } from 'http';
import Room from 'interfaces/room.interface';
import { initDb } from 'loaders/db.loader';
import { initApp } from 'loaders/express.loader';
import { ImageModel } from 'models/image.model';
import {
  createAndSaveRoomDoc,
  getBackgroundImage,
  getRoomById,
  roomCount,
  RoomModel,
  setBackgroundImage,
} from 'models/room.model';
import mongoose from 'mongoose';
import { RoomClientRoutes } from 'routes/room.routes';
import request from 'supertest';
import { imageFile } from 'utils/test.utils';

const goodRoomData: Room = {
  _id: '',
  backgroundImageId: '',
  canvasImage: '',
  height: 1,
  width: 1,
};

const badRoomData = {};
const app = express();
const encoding = 'base64';

let expressServer: Server;
const ERROR = 400;

beforeAll(async () => {
  await initDb(process.env.MONGO_URL || '');
  expressServer = initApp(app);
});

beforeEach(async () => {
  await RoomModel.deleteMany({});
  await ImageModel.deleteMany({});
});

afterAll(async () => {
  expressServer.close();
  await mongoose.disconnect();
});

describe('CREATE_ROOM', () => {
  test('create room request responds with error', done => {
    request(app)
      .post(RoomClientRoutes().CREATE_ROOM)
      .send(badRoomData)
      .expect(ERROR, done);
  });

  test('create room request responds with success', done => {
    request(app)
      .post(RoomClientRoutes().CREATE_ROOM)
      .send(goodRoomData)
      .expect(async res => {
        expect(res.text).toBeTruthy();
        let room = JSON.parse(res.text) as Room;
        expect(room._id).toBeTruthy();
        const n = await roomCount();
        expect(n).toBe(1);
      })
      .expect(200, done);
  });
});

describe('get room by id route', () => {
  test('invalid id returns undefined', done => {
    request(app)
      .get(RoomClientRoutes('badid').GET_ROOM)
      .expect(res => {
        expect(res.text).toBeFalsy();
      })
      .expect(ERROR, done);
  });
  test('valid id', async () => {
    let controlRoom = await createAndSaveRoomDoc(goodRoomData);
    request(app)
      .get(RoomClientRoutes(controlRoom._id).GET_ROOM)
      .expect(res => {
        let testRoom = JSON.parse(res.text) as Room;
        expect(testRoom).toBeDefined();
        expect(testRoom._id).toBe(controlRoom._id);
      })
      .expect(200);
  });
});

test('delete room by id route', async () => {
  const { _id } = await createAndSaveRoomDoc(goodRoomData);
  expect(_id).toBeTruthy();
  await request(app).get(RoomClientRoutes(_id).DELETE_ROOM).expect(200);
  const testRoom = await getRoomById(_id);
  expect(testRoom).toBeFalsy();
});

test('delete all rooms route', async () => {
  await createAndSaveRoomDoc(goodRoomData);
  await createAndSaveRoomDoc(goodRoomData);
  await request(app).get(RoomClientRoutes().DELETE_ALL).expect(200);
  const n = await roomCount();
  expect(n).toBe(0);
});

test('set image route', async () => {
  let { _id } = await createAndSaveRoomDoc(goodRoomData);
  let route = RoomClientRoutes(_id).SET_IMAGE;
  request(app)
    .post(route)
    .set('content-type', 'multipart/form-data')
    .attach('image', __dirname + '/image.jpg')
    .expect(200);
});

describe('get background image', () => {
  test('invalid room responds with error', done => {
    request(app)
      .get(RoomClientRoutes('badid').GET_BACKGROUND_IMAGE)
      .expect(ERROR, done);
  });

  test('get background image', async () => {
    let room = await createAndSaveRoomDoc(goodRoomData);
    let controlImage = await setBackgroundImage(room._id, imageFile);
    await request(app)
      .get(RoomClientRoutes(room._id).GET_BACKGROUND_IMAGE)
      .expect(async res => {
        let encodedImage = res.text;
        expect(encodedImage).toBeDefined();
        expect(encodedImage).toBe(controlImage?.imageBuffer.toString('base64'));
      })
      .expect(200);
  });
});

describe('get background image', () => {
  test('invalid room responds with error', done => {
    request(app)
      .get(RoomClientRoutes('badid').GET_BACKGROUND_IMAGE)
      .expect(ERROR, done);
  });
  test('get background image', async () => {
    let room = await createAndSaveRoomDoc(goodRoomData);
    let controlImage = await setBackgroundImage(room._id, imageFile);
    await request(app)
      .get(RoomClientRoutes(room._id).GET_BACKGROUND_IMAGE)
      .expect(async res => {
        let encodedImage = res.text;
        expect(encodedImage).toBeDefined();
        expect(encodedImage).toBe(controlImage?.imageBuffer.toString('base64'));
      })
      .expect(200);
  });
});

describe('delete background image', () => {
  const route = (id: string) => RoomClientRoutes(id).DELETE_BACKGROUND_IMAGE;
  test('invalid room responds with error', done => {
    request(app).get(route('badid')).expect(ERROR, done);
  });
  test('delete background image', async () => {
    const room = await createAndSaveRoomDoc(goodRoomData);
    await setBackgroundImage(room._id, imageFile);
    await request(app).get(route(room._id)).expect(200);
    const testImage = await getBackgroundImage(room._id);
    expect(testImage).toBeFalsy();
    expect(testImage?.id).toBeFalsy();
  });
});

describe('update canvas', () => {
  test('canvas image data successfully updates', async () => {
    let controlData = { canvasImage: 'abc123' } as Partial<Room>;
    let room = await createAndSaveRoomDoc(goodRoomData);
    await request(app)
      .post(RoomClientRoutes(room._id).UPDATE_CANVAS)
      .type('application/json')
      .send(JSON.stringify(controlData))
      .expect(200);
    let updatedRoom = await getRoomById(room._id);
    expect(updatedRoom?.canvasImage).toBe(controlData.canvasImage);
  });
});

test('count rooms', async () => {
  await request(app)
    .get(RoomClientRoutes().COUNT)
    .send()
    .expect(res => {
      const n = Number(res.text);
      expect(n).toBe(0);
    })
    .expect(200);
});
