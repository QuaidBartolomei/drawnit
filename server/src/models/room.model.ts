import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import Room from 'interfaces/room.interface';
import {
  createAndSaveImageDocument,
  ImageFile,
  ImageModel,
} from './image.model';

const collectionName = 'Room';

const roomSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate(),
    _id: true,
  },
  canvasImage: {
    type: String,
    default: '',
  },
  dateLastVisited: {
    type: Date,
    default: Date.now(),
  },
  height: {
    type: Number,
    default: 400,
  },
  width: {
    type: Number,
    default: 400,
  },
  backgroundImageId: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    expires: 3600 * 4, // delete room after 4 hr
    default: Date.now,
  },
});

export type RoomDocument = Room & mongoose.Document;
export const RoomModel = mongoose.model<RoomDocument>(
  collectionName,
  roomSchema
);

export const createAndSaveRoomDoc = async (data: Partial<Room>) => {
  let room = new RoomModel({ ...data, _id: shortid.generate() });
  room.isNew = true;
  return room.save();
};

export async function getRoomById(id: string) {
  return (await RoomModel.findById(id)) || undefined;
}

export async function getAllRooms(): Promise<Room[]> {
  return await RoomModel.find({});
}

export async function setBackgroundImage(
  roomId: string,
  file: Partial<ImageFile>
) {
  let room = await RoomModel.findById(roomId);
  if (!room) return undefined;

  let image = await createAndSaveImageDocument(file);
  if (!image) return undefined;
  room.overwrite({ ...room, backgroundImageId: image.id });
  room.backgroundImageId = image.id;
  await room.save();
  return image;
}

export async function getBackgroundImage(roomId: string) {
  let room = await RoomModel.findById(roomId);
  if (!room || !room.backgroundImageId) return undefined;
  let image = await ImageModel.findById(room.backgroundImageId);
  if (!image) return undefined;
  return image;
}

export async function updateRoomValue(
  roomId: string,
  newSettings: Partial<Room>
) {
  return await RoomModel.findByIdAndUpdate(roomId, newSettings, {
    new: true,
    useFindAndModify: false,
  });
}

export async function deleteAllRooms() {
  const roomSuccess = await RoomModel.deleteMany({});
  const imageSuccess = await ImageModel.deleteMany({});
  return roomSuccess && imageSuccess;
}

export async function roomCount(): Promise<number> {
  return await RoomModel.countDocuments();
}
