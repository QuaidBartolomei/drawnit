import axios, { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import Room from 'interfaces/room.interface'
import { RoomClientRoutes } from 'routes'
import { BackgroundImage } from './cloudinary'

// CREATE_ROOM: '/room/create',
export async function createRoom(roomData: Partial<Room> = {}) {
  try {
    const response = await axios.post(RoomClientRoutes().CREATE_ROOM, {
      _id: '',
      backgroundImageUrl: '',
      canvasImage: '',
      height: 1,
      width: 1,
      ...roomData,
    })
    return response.data as Room
  } catch (error) {
    console.error(error)
  }
}

// GET_ROOM: `/room/get/${roomId}`,
export async function getRoom(id: string): Promise<Room | undefined> {
  try {
    console.log('getting room data...')
    const route = RoomClientRoutes(id).GET_ROOM
    const response: AxiosResponse<Room> = await axios.get(route)
    if (response.status !== 200) throw new Error('room not found')
    const room = response.data as Room
    return room
  } catch (error) {
    console.error(error)
    return undefined
  }
}

// SET_IMAGE: `/room/setImage/${roomId}`,
export async function setImage(
  id: string,
  image: BackgroundImage,
): Promise<Room | undefined> {
  try {
    console.log('setting image...')
    const res = await axios.post(RoomClientRoutes(id).SET_IMAGE, image)
    if (res.status !== StatusCodes.OK) return undefined
    return await getRoom(id)
  } catch (error) {
    console.error(error)
  }
}

// UPDATE_CANVAS: `/room/update/${roomId}`,
export async function saveCanvasToDb(
  id: string,
  canvasString: string,
): Promise<boolean> {
  try {
    const res = await axios.post(RoomClientRoutes(id).UPDATE_CANVAS, {
      canvasImage: canvasString,
    } as Partial<Room>)
    return res.status === StatusCodes.OK
  } catch (error) {
    console.error(error)
    return false
  }
}

// DELETE_BACKGROUND_IMAGE: `/room/deleteImage/${roomId}`,
export async function deleteBackgroundImage({
  id,
}: {
  id: string
}): Promise<boolean> {
  const res = await axios.get(RoomClientRoutes(id).DELETE_BACKGROUND_IMAGE)
  if (res.status !== StatusCodes.OK) return true
  return false
}
