import { Router } from 'express'
import { imageSize } from 'image-size'
import multer from 'multer'
import Room from 'interfaces/room.interface'
import {
  createAndSaveRoomDoc,
  deleteAllRooms,
  deleteBackgroundImage,
  getBackgroundImage,
  getRoomById,
  roomCount,
  RoomModel,
  setBackgroundImage,
  updateRoomValue,
} from 'models/room.model'
import { RoomRoutes } from 'routes'

export const roomController = Router()
  .post(RoomRoutes.CREATE_ROOM, async (req, res) => {
    console.log('creating room')
    const room: Room = req.body
    if (!room.height || !room.width) return res.status(400).send()
    try {
      const savedRoom = await createAndSaveRoomDoc(room)
      res.status(200).send(JSON.stringify(savedRoom))
    } catch {
      res.status(400).send()
    }
  })
  .get(RoomRoutes.GET_ROOM, async (req, res) => {
    const { id } = req.params
    try {
      console.log('getting room data... ')
      const roomDoc = await getRoomById(id)
      if (!roomDoc) return res.status(400).send()
      res.status(200).send(JSON.stringify(roomDoc))
    } catch {
      res.status(500).send()
    }
  })
  .get(RoomRoutes.DELETE_ROOM, async (req, res) => {
    const { id } = req.params
    try {
      await RoomModel.findByIdAndDelete(id)
      res.status(200).send()
    } catch {
      res.status(500).send()
    }
  })
  .get(RoomRoutes.DELETE_ALL, async (req, res) => {
    try {
      await deleteAllRooms()
      res.status(200).send()
    } catch {
      res.status(500).send()
    }
  })
  .get(RoomRoutes.GET_BACKGROUND_IMAGE, async (req, res) => {
    const { id } = req.params
    try {
      const image = await getBackgroundImage(id)
      if (!image) return res.status(400).send()
      res.status(200).send(image.imageBuffer.toString('base64'))
    } catch {
      res.status(500).send()
    }
  })
  .post(RoomRoutes.SET_IMAGE, multer().single('image'), async (req, res) => {
    const { id } = req.params
    try {
      const { file } = req
      if (!file) throw Error('file not found')
      await setBackgroundImage(id, { file })
      const { height, width } = imageSize(file.buffer)
      console.log('image size:', { height, width })
      await updateRoomValue(id, { height, width })
      res.status(200).send()
    } catch {
      res.status(500).send()
    }
  })
  .get(RoomRoutes.DELETE_BACKGROUND_IMAGE, async (req, res) => {
    const { id } = req.params
    try {
      const success = await deleteBackgroundImage(id)
      if (!success) res.status(400).send()
      res.status(200).send()
    } catch {
      res.status(500).send()
    }
  })
  .post(RoomRoutes.UPDATE_CANVAS, async (req, res) => {
    const { id } = req.params
    const data: Partial<Room> = req.body
    try {
      const updatedRoom = await updateRoomValue(id, data)
      if (!updatedRoom) return res.status(400).send()
      res.status(200).send()
    } catch {
      res.status(500).send()
    }
  })
  .get(RoomRoutes.COUNT, async (req, res) => {
    try {
      const n = await roomCount()
      res.status(200).send(n.toString())
    } catch {
      res.status(500).send()
    }
  })
