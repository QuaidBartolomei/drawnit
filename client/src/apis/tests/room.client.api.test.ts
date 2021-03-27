import {
  countRooms,
  createRoom,
  deleteAllRooms,
  deleteRoom,
  getAllRooms,
  getBackgroundImage,
  getRoom,
  saveCanvasToDb,
  setImage,
} from 'apis/room.client.api';
import { imageBlob, imageBuffer, imageFile } from 'utils/test.utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { RoomClientRoutes, RoomRoutes } from 'routes/room.api.routes';
import { StatusCodes } from 'http-status-codes';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const badId = 'badid';

const exampleRoom = { backgroundImageId: '1' };

const server = setupServer(
  rest.get(RoomClientRoutes(badId).GET_ROOM, (req, res, ctx) => {
    return res(ctx.json(undefined));
  }),
  rest.post(RoomRoutes.CREATE_ROOM, (req, res, ctx) => {
    return res(ctx.json({ _id: '1' }));
  }),
  rest.post(RoomRoutes.SET_IMAGE, (req, res, ctx) => {
    return res(ctx.json({ _id: req.params.id, backgroundImageId: '1' }));
  }),
  rest.post(RoomRoutes.UPDATE_CANVAS, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(RoomRoutes.GET_ROOM, (req, res, ctx) => {
    return res(ctx.json({ ...exampleRoom, _id: req.params.id }));
  }),
  rest.get(RoomRoutes.DELETE_ALL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(RoomRoutes.DELETE_ROOM, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(RoomRoutes.GET_BACKGROUND_IMAGE, (req, res, ctx) => {
    return res(ctx.text(imageBuffer.toString('base64')));
  })
);

// CREATE_ROOM: '/room/create',
describe('createRoom', () => {
  test('createRoom and get', async () => {
    const controlRoom = await createRoom();
    const id = controlRoom?._id || '';
    expect(id).toBeTruthy();
  });
});

// GET_ROOM: `/room/get/${roomId}`,
describe('GET_ROOM', () => {
  test('invalid id returns undefined', async () => {
    const testRoom = await getRoom(badId);
    expect(testRoom).toBeFalsy();
  });
  test('getRoomById', async () => {
    const id = '2';
    const testRoom = await getRoom(id);
    expect(testRoom).toBeTruthy();
    expect(testRoom?._id).toBeTruthy();
    expect(testRoom?._id).toBe(id);
  });
});

// DELETE_ALL: `/room/delete-all/`,
test('delete all rooms', async () => {
  const success = await deleteAllRooms();
  expect(success).toBeTruthy();
});

// GET_All: '/room/all',
// test('GET_ALL', async () => {
//   let noRooms = await getAllRooms();
//   expect(noRooms?.length).toBe(0);
//   await createRoom();
//   await createRoom();
//   const rooms = await getAllRooms();
//   expect(rooms?.length).toBe(2);
// });

// SET_IMAGE: `/room/setImage/${roomId}`,
describe('SET_IMAGE', () => {
  test('invalid room returns undefined', async () => {
    server.use(
      rest.post(RoomClientRoutes(badId).SET_IMAGE, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const testRoom = await setImage(badId, imageFile);
    expect(testRoom).toBeFalsy();
  });
  test('valid room', async () => {
    const id = '2';
    const testRoom = await setImage(id, imageFile);
    expect(testRoom).toBeTruthy();
    expect(testRoom?._id).toBe(id);
    expect(testRoom?.backgroundImageId).toBeTruthy();
  });
});

// GET_BACKGROUND_IMAGE: `/room/getImage/${roomId}`,
describe('GET_BACKGROUND_IMAGE', () => {
  test('invalid room returns undefined', async () => {
    server.use(
      rest.get(
        RoomClientRoutes(badId).GET_BACKGROUND_IMAGE,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    const testRoom = await getBackgroundImage(badId);
    expect(testRoom).toBeFalsy();
  });
  test('valid room', async () => {
    const id = '2';
    const testRoom = await setImage(id, imageFile);
    expect(testRoom).toBeTruthy();
    expect(testRoom?._id).toBe(id);
    expect(testRoom?.backgroundImageId).toBeTruthy();
    const encodedImage = await getBackgroundImage(id);
    expect(encodedImage).toBeTruthy();
    expect(encodedImage?.size).toBe(imageBlob.size);
  });
});

// UPDATE_CANVAS: `/room/update/${roomId}`,
describe('UPDATE_CANVAS', () => {
  test('invalid room returns undefined', async () => {
    server.use(
      rest.post(RoomClientRoutes(badId).UPDATE_CANVAS, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const testRoom = await saveCanvasToDb(badId, '');
    expect(testRoom).toBeFalsy();
  });

  test('valid room', async () => {
    const id = '2';
    const canvasString = 'newCanvas';
    const res = await saveCanvasToDb(id, canvasString);
    expect(res).toBeTruthy();
  });
});

// DELETE_ROOM: `/room/delete/${roomId}`,
describe('DELETE_ROOM', () => {
  test('valid room', async () => {
    const id = '2';
    const result = await deleteRoom(id);
    expect(result).toBeTruthy();
  });
});
