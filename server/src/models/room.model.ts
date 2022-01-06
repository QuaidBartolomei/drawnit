import mongoose, { Schema } from 'mongoose'
import shortid from 'shortid'
import Room from 'interfaces/room.interface'
import { ImageModel } from 'models/image.model'

const collectionName = 'Room'

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
  backgroundImageUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    expires: 3600 * 4, // delete room after 4 hr
    default: Date.now,
  },
})

export type RoomDocument = Room & mongoose.Document
export const RoomModel = mongoose.model<RoomDocument>(
  collectionName,
  roomSchema,
)

export const createAndSaveRoomDoc = (data: Partial<Room>) => {
  const room = new RoomModel({ ...data, _id: shortid.generate() })
  room.isNew = true
  return room.save()
}

export async function getRoomById(id: string) {
  return (await RoomModel.findById(id)) || undefined
}

export async function setBackgroundImage(roomId: string, url: string) {
  const room = await RoomModel.findById(roomId)
  if (!room) return undefined
  room.backgroundImageUrl = url
  await room.save()
  return url
}

export async function deleteBackgroundImage(roomId: string) {
  const room = await RoomModel.findById(roomId)
  if (!room) return false
  const { backgroundImageUrl } = room
  if (!backgroundImageUrl) return false
  room.overwrite({ ...room, backgroundImageUrl: '' })
  room.backgroundImageUrl = ''
  await room.save()
  return true
}

export async function getBackgroundImage(roomId: string) {
  const room = await RoomModel.findById(roomId)
  return room?.backgroundImageUrl
}

export function updateRoomValue(roomId: string, newSettings: Partial<Room>) {
  return RoomModel.findByIdAndUpdate(roomId, newSettings, {
    new: true,
    useFindAndModify: false,
  })
}

export async function deleteAllRooms() {
  const roomSuccess = await RoomModel.deleteMany({})
  const imageSuccess = await ImageModel.deleteMany({})
  return roomSuccess && imageSuccess
}

export function roomCount() {
  return RoomModel.countDocuments()
}

export const deleteExpiredRooms = async (
  maxAge = 1 * 24 * 60 * 60 * 1000, // 1 day
) => {
  const minDate = new Date(Date.now() - maxAge)
  const expiredRoomsQuery = {
    dateLastVisited: {
      $lte: minDate,
    },
  }
  const expiredRooms = await RoomModel.find(expiredRoomsQuery)
  console.log('deleting expired rooms:', expiredRooms.length)
  await RoomModel.deleteMany(expiredRoomsQuery)
}
