import {
  countRooms,
  createRoom,
  deleteAllRooms,
  deleteRoom,
  getAllRooms,
  getBackgroundImage,
  getRoom,

  saveCanvasToDb, setImage
} from 'apis/room.api';
import { imageBlob, imageFile } from 'utils/test.utils';

// let rooms: Room[] = [];

// const server = setupServer(
//   rest.get(RoomRoutes.COUNT, (req, res, ctx) => {
//     return res(ctx.text(rooms.length.toString()));
//   }),
//   rest.post(RoomRoutes.CREATE_ROOM, (req, res, ctx) => {
//     const room = req.body as Room;
//     room._id = rooms.length.toString();
//     rooms.push(room);
//     return res(ctx.json(room));
//   }),
//   rest.delete(RoomRoutes.DELETE_ROOM, (req, res, ctx) => {
//     let id = req.params.id as string;
//     rooms = rooms.filter((room) => room._id !== id);
//     return res(ctx.status(StatusCodes.OK));
//   }),
//   rest.delete(RoomRoutes.DELETE_ALL, (req, res, ctx) => {
//     rooms = [];
//     return res(ctx.status(StatusCodes.OK));
//   }),
//   rest.get(RoomRoutes.GET_ROOM, (req, res, ctx) => {
//     let id = req.params.id as string;
//     let room = rooms.find((room) => room._id === id);
//     if (!room) return res(ctx.status(StatusCodes.BAD_REQUEST));
//     return res(ctx.json(room));
//   }),
//   rest.get(RoomRoutes.GET_All, (req, res, ctx) => {
//     return res(ctx.json(rooms));
//   }),
//   rest.post(RoomRoutes.SET_IMAGE, (req, res, ctx) => {
//     let id = req.params.id as string;
//     let room = rooms.find((room) => room._id === id);
//     if (!room) return res(ctx.status(StatusCodes.BAD_REQUEST));
//     room.backgroundImageId = '1';
//     return res(ctx.json(room));
//   }),
//   rest.get(RoomRoutes.GET_BACKGROUND_IMAGE, (req, res, ctx) => {
//     let id = req.params.id as string;
//     let room = rooms.find((room) => room._id === id);
//     if (!room) return res(ctx.status(StatusCodes.BAD_REQUEST));
//     return res(ctx.json(room));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
//   rooms = [];
// });
// afterAll(() => server.close());


beforeEach(async () => {
  await deleteAllRooms();
});
afterAll(async () => {
  await deleteAllRooms();
});


async function checkCount(expectedCount: number) {
  const controlRoomCount = await countRooms();
  expect(controlRoomCount).toBe(expectedCount);
}
async function createRoomAndGetId(): Promise<string> {
  const controlRoom = await createRoom();
  const id = controlRoom?._id || '';
  expect(id).toBeTruthy();
  return id;
}

// CREATE_ROOM: '/room/create',
describe('createRoom', () => {
  test('createRoom and get', async () => {
    let id = await createRoomAndGetId();
    expect(id).toBeTruthy();
  });
});

// DELETE_ALL: `/room/delete-all/`,
test('delete all rooms', async () => {
  await createRoom();
  await checkCount(1);
  const success = await deleteAllRooms();
  expect(success).toBeTruthy();
  await checkCount(0);
});

// GET_ROOM: `/room/get/${roomId}`,
describe('GET_ROOM', () => {
  test('invalid id returns undefined', async () => {
    const id = 'badid';
    const testRoom = await getRoom(id);
    expect(testRoom).toBeFalsy();
  });
  test('getRoomById', async () => {
    const id = await createRoomAndGetId();
    const testRoom = await getRoom(id);
    expect(testRoom).toBeTruthy();
    expect(testRoom?._id).toBeTruthy();
    expect(testRoom?._id).toBe(id);
  });
});

// GET_All: '/room/all',
test('GET_ALL', async () => {
  let noRooms = await getAllRooms();
  expect(noRooms?.length).toBe(0);
  await createRoom();
  await createRoom();
  const rooms = await getAllRooms();
  expect(rooms?.length).toBe(2);
});

// SET_IMAGE: `/room/setImage/${roomId}`,
describe('SET_IMAGE', () => {
  test('invalid room returns undefined', async () => {
    const testRoom = await setImage('badid', imageFile);
    expect(testRoom).toBeFalsy();
  });
  test('valid room', async () => {
    const id = await createRoomAndGetId();
    const testRoom = await setImage(id, imageFile);
    expect(testRoom).toBeTruthy();
    expect(testRoom?._id).toBe(id);
    expect(testRoom?.backgroundImageId).toBeTruthy();
  });
});

// GET_BACKGROUND_IMAGE: `/room/getImage/${roomId}`,
describe('GET_BACKGROUND_IMAGE', () => {
  test('invalid room returns undefined', async () => {
    const testRoom = await getBackgroundImage('badid');
    expect(testRoom).toBeFalsy();
  });
  test('empty room id returns undefined', async () => {
    const testRoom = await getBackgroundImage('');
    expect(testRoom).toBeFalsy();
  });
  test('valid room', async () => {
    const id = await createRoomAndGetId();
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
    const testRoom = await saveCanvasToDb('badid', '');
    expect(testRoom).toBeFalsy();
  });
  test('empty room id returns undefined', async () => {
    const testRoom = await saveCanvasToDb('', '');
    expect(testRoom).toBeFalsy();
  });
  test('valid room', async () => {
    const id = await createRoomAndGetId();
    const canvasString = 'newCanvas';
    const res = await saveCanvasToDb(id, canvasString);
    expect(res).toBeTruthy(); 
  });
});

// DELETE_ROOM: `/room/delete/${roomId}`,
describe('DELETE_ROOM', () => {
  test('valid room', async () => {
    const id = await createRoomAndGetId();
    await deleteRoom(id);
    const testRoom = await getRoom(id);
    expect(testRoom).toBeFalsy();
  });
});

test('countRooms', async () => {
  await checkCount(0);
  await createRoom();
  await checkCount(1);
  await createRoom();
  await checkCount(2);
});
