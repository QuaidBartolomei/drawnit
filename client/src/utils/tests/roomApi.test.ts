import { rest } from 'msw'
import { RoomClientRoutes } from 'routes'
import {
  createRoom,
  getBackgroundImageUrl,
  getRoom,
  saveCanvasToDb,
  setImage,
} from 'utils/roomApi'
import { imageFile, initServer } from 'utils/test'

const server = initServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// CREATE_ROOM: '/room/create',
describe('createRoom', () => {
  test('createRoom and get', async () => {
    const controlRoom = await createRoom()
    const id = controlRoom?._id || false
    expect(id).toBeTruthy()
  })
})

// GET_ROOM: `/room/get/${roomId}`,
describe('GET_ROOM', () => {
  test('invalid id returns undefined', async () => {
    const testRoom = await getRoom('')
    expect(testRoom).toBeFalsy()
  })
  test('getRoomById', async () => {
    const id = 'example'
    const testRoom = await getRoom(id)
    expect(testRoom).toBeTruthy()
    expect(testRoom?._id).toBeTruthy()
    expect(testRoom?._id).toBe(id)
  })
})

// SET_IMAGE: `/room/setImage/${roomId}`,
describe('SET_IMAGE', () => {
  test('invalid room returns undefined', async () => {
    server.use(
      rest.post(RoomClientRoutes('').SET_IMAGE, (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )
    const testRoom = await setImage('', imageFile)
    expect(testRoom).toBeFalsy()
  })
  test('valid room', async () => {
    const id = '2'
    const testRoom = await setImage(id, imageFile)
    expect(testRoom).toBeTruthy()
  })
})

// GET_BACKGROUND_IMAGE: `/room/getImage/${roomId}`,
describe('GET_BACKGROUND_IMAGE', () => {
  test('valid room', async () => {
    const id = '2'
    const testRoom = await setImage(id, imageFile)
    expect(testRoom).toBeTruthy()
    const encodedImage = await getBackgroundImageUrl({
      _id: testRoom?._id,
      backgroundImageId: '2',
    })
    expect(encodedImage).toBeTruthy()
  })
})

// UPDATE_CANVAS: `/room/update/${roomId}`,
describe('UPDATE_CANVAS', () => {
  test('invalid room returns undefined', async () => {
    server.use(
      rest.post(RoomClientRoutes('').UPDATE_CANVAS, (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )
    const testRoom = await saveCanvasToDb('', '')
    expect(testRoom).toBeFalsy()
  })

  test('valid room', async () => {
    const id = '2'
    const canvasString = 'newCanvas'
    const res = await saveCanvasToDb(id, canvasString)
    expect(res).toBeTruthy()
  })
})
