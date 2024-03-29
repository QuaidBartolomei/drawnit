import express from 'express'
import request from 'supertest'
import Room from 'interfaces/room.interface'
import { initApp } from 'loaders/app.loader'
import { ImageModel } from 'models/image.model'
import {
  createAndSaveRoomDoc,
  getBackgroundImage,
  getRoomById,
  roomCount,
  RoomModel,
  setBackgroundImage,
} from 'models/room.model'
import { RoomClientRoutes } from 'routes'

const goodRoomData: Room = {
  _id: '',
  backgroundImageUrl: '',
  canvasImage: '',
  height: 1,
  width: 1,
}

const badRoomData = {}
const app = express()

const ERROR = 400
let controlRoom: Room = goodRoomData

beforeAll(() => {
  initApp(app)
})

beforeEach(async () => {
  await RoomModel.deleteMany({})
  await ImageModel.deleteMany({})
  controlRoom = await createAndSaveRoomDoc(goodRoomData)
})

describe('CREATE_ROOM', () => {
  test('create room request responds with error', (done) => {
    request(app)
      .post(RoomClientRoutes().CREATE_ROOM)
      .send(badRoomData)
      .expect(ERROR, done)
  })

  test('create room request responds with success', (done) => {
    request(app)
      .post(RoomClientRoutes().CREATE_ROOM)
      .send(goodRoomData)
      .expect(async (res) => {
        expect(res.text).toBeTruthy()
        const room = JSON.parse(res.text) as Room
        expect(room._id).toBeTruthy()
        const n = await roomCount()
        expect(n).toBe(2)
      })
      .expect(200, done)
  })
})

test('delete room by id route', async () => {
  const { _id } = controlRoom
  expect(_id).toBeTruthy()
  await request(app).get(RoomClientRoutes(_id).DELETE_ROOM).expect(200)
  const testRoom = await getRoomById(_id)
  expect(testRoom).toBeFalsy()
})

test('delete all rooms route', async () => {
  await createAndSaveRoomDoc(goodRoomData)
  await createAndSaveRoomDoc(goodRoomData)
  await request(app).get(RoomClientRoutes().DELETE_ALL).expect(200)
  const n = await roomCount()
  expect(n).toBe(0)
})

test('set image route', async () => {
  const { _id } = controlRoom
  const route = RoomClientRoutes(_id).SET_IMAGE
  await request(app)
    .post(route)
    .send({
      height: 1, //
      width: 1,
      url: 'http',
    })
    .set('Accept', 'application/json')
    .expect(200)
})

describe('delete background image', () => {
  const route = (id: string) => RoomClientRoutes(id).DELETE_BACKGROUND_IMAGE

  test('invalid room responds with error', (done) => {
    request(app).get(route('badid')).expect(ERROR, done)
  })
  test('delete background image', async () => {
    const room = await createAndSaveRoomDoc(goodRoomData)
    await setBackgroundImage(room._id, '#')
    await request(app).get(route(room._id)).expect(200)
    const testImage = await getBackgroundImage(room._id)
    expect(testImage).toBeFalsy()
  })
})

describe('update canvas', () => {
  test('invalid room responds with error', (done) => {
    request(app)
      .post(RoomClientRoutes('badid').UPDATE_CANVAS)
      .send({})
      .expect(ERROR, done)
  })

  test('canvas image data successfully updates', async () => {
    const controlData = { canvasImage: 'abc123' } as Partial<Room>
    const room = await createAndSaveRoomDoc(goodRoomData)
    await request(app)
      .post(RoomClientRoutes(room._id).UPDATE_CANVAS)
      .type('application/json')
      .send(JSON.stringify(controlData))
      .expect(200)
    const updatedRoom = await getRoomById(room._id)
    expect(updatedRoom?.canvasImage).toBe(controlData.canvasImage)
  })
})

test('count rooms', async () => {
  await request(app)
    .get(RoomClientRoutes().COUNT)
    .send()
    .expect((res) => {
      const n = Number(res.text)
      expect(n).toBe(1)
    })
    .expect(200)
})
