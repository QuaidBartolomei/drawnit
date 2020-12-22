import Room from 'interfaces/room.interface';
import { initDb } from 'loaders/db.loader';
import { ImageModel } from 'models/image.model';
import {
  createAndSaveRoomDoc,
  deleteAllRooms,
  getAllRooms,
  getBackgroundImage,
  getRoomById,
  roomCount,
  RoomModel,
  setBackgroundImage,
  updateRoomValue,
} from 'models/room.model';
import mongoose from 'mongoose';
import { imageFile } from 'utils/test.utils';

const goodRoomData: Room = {
  _id: '',
  backgroundImageId: '',
  canvasImage: '',
  height: 1,
  width: 1,
};

beforeAll(async () => {
  await initDb(process.env.MONGO_URL || '');
  mongoose.connection.readyState;
});

beforeEach(async () => {
  await RoomModel.deleteMany({});
  await ImageModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('createAndSaveRoomDoc', () => {
  test('create & save room successfully', async () => {
    const savedRoom = await createAndSaveRoomDoc(goodRoomData);
    expect(savedRoom._id).toBeDefined();
    expect(savedRoom.backgroundImageId).toBe(goodRoomData.backgroundImageId);
    expect(savedRoom.canvasImage).toBe(goodRoomData.canvasImage);
    expect(savedRoom.height).toBe(goodRoomData.height);
    expect(savedRoom.width).toBe(goodRoomData.width);
    let retrievedRoom = await RoomModel.findById(savedRoom._id);
    expect(retrievedRoom).toBeTruthy();
    expect(retrievedRoom?._id).toBe(savedRoom._id);

    for (let index = 0; index < 10; index++) {
      await createAndSaveRoomDoc(goodRoomData);
    }

    const n = await roomCount();
    expect(n).toBe(11);
  });
});

describe('get room by id', () => {
  test('invalid room id returns undefined', async () => {
    let room = await getRoomById('');
    expect(room).toBeUndefined();
  });

  test('valid room id returns expected room', async () => {
    let roomControl = await createAndSaveRoomDoc(goodRoomData);
    let roomTest = await getRoomById(roomControl._id);
    expect(roomTest).toBeDefined();
    expect(roomTest?.backgroundImageId).toBe(roomControl.backgroundImageId);
    expect(roomTest?.canvasImage).toBe(roomControl.canvasImage);
    expect(roomTest?.height).toBe(roomControl.height);
    expect(roomTest?.width).toBe(roomControl.width);
  });
});

test('get all rooms', async () => {
  await createAndSaveRoomDoc(goodRoomData);
  await createAndSaveRoomDoc(goodRoomData);
  const n = await roomCount();
  expect(n).toBe(2);
});

describe('set background image', () => {
  test('set background image: invalid room returns undefined', async () => {
    let image = await setBackgroundImage('', imageFile);
    expect(image).toBeUndefined();
  });

  test('set background image: invalid image file returns undefined', async () => {
    let { _id } = await createAndSaveRoomDoc(goodRoomData);
    let image = await setBackgroundImage(_id, {});
    expect(image).toBeUndefined();
  });

  test('valid params return image file', async () => {
    let { _id } = await createAndSaveRoomDoc(goodRoomData);
    let image = await setBackgroundImage(_id, imageFile);
    let room = await getRoomById(_id);
    expect(image).toBeDefined();
    expect(image?.id).toBeDefined();
    expect(image?.id).toBe(room?.backgroundImageId);
  });
});

describe('get background image', () => {
  test('invaid room id returns undefined', async () => {
    let testImage = await getBackgroundImage('');
    expect(testImage).toBeUndefined();
  });

  test('room with no image returns undefined', async () => {
    let { _id } = await createAndSaveRoomDoc(goodRoomData);
    let testImage = await getBackgroundImage(_id);
    expect(testImage).toBeUndefined();
  });

  test('valid params return image file', async () => {
    let room = await createAndSaveRoomDoc(goodRoomData);
    let controlImage = await setBackgroundImage(room._id, imageFile);
    let testImage = await getBackgroundImage(room._id);
    expect(testImage).toBeDefined();
    expect(testImage?.id).toBeDefined();
    expect(testImage?.id).toBe(controlImage?.id);
  });
});

describe('updateRoomValue', () => {
  test('invaid room id returns null', async () => {
    let room = await updateRoomValue('', {});
    expect(room).toBeFalsy();
  });
  test('room updates correctly', async () => {
    let room = await createAndSaveRoomDoc(goodRoomData);
    let updatedRoom = await updateRoomValue(room._id, { width: 100 });
    expect(updatedRoom).toBeTruthy();
    expect(updatedRoom?.width).toBe(100);
    const canvasString = 'newCanvas';
    updatedRoom = await updateRoomValue(room._id, {
      canvasImage: canvasString,
    });
    expect(updatedRoom?.canvasImage).toBe(canvasString);
  });
});

test('delete all rooms', async () => {
  await createAndSaveRoomDoc(goodRoomData);
  await createAndSaveRoomDoc(goodRoomData);
  const success = await deleteAllRooms();
  expect(success).toBeTruthy();
  const n = await roomCount();
  expect(n).toBe(0);
});

test('roomCount', async () => {
  let n = await roomCount();
  expect(n).toBe(0);
});