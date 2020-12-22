import { Router } from 'express';
import Room from 'interfaces/room.interface';
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
import multer from 'multer';
import { RoomRoutes } from 'routes/room.routes';

export function useRoomController() {
  const router = Router();

  router
    .post(RoomRoutes.CREATE_ROOM, async (req, res) => {
      let room = req.body as Room;
      if (!room.height || !room.width) return res.status(400).send();
      try {
        let savedRoom = await createAndSaveRoomDoc(room);
        if (!savedRoom) return res.status(400).send();
        res.status(200).send(JSON.stringify(savedRoom));
      } catch {
        res.status(500).send();
      }
    })
    .get(RoomRoutes.GET_ROOM, async (req, res) => {
      let id = req.params.id as string;
      try {
        let roomDoc = await getRoomById(id);
        if (!roomDoc) return res.status(400).send();
        res.status(200).send(JSON.stringify(roomDoc));
      } catch {
        res.status(500).send();
      }
    })
    .get(RoomRoutes.DELETE_ROOM, async (req, res) => {
      let id = req.params.id as string;
      try {
        await RoomModel.findByIdAndDelete(id);
        res.status(200).send();
      } catch {
        res.status(500).send();
      }
    })
    .get(RoomRoutes.DELETE_ALL, async (req, res) => {
      try {
        await deleteAllRooms();
        res.status(200).send();
      } catch {
        res.status(500).send();
      }
    })
    .get(RoomRoutes.GET_All, async (req, res) => {
      try {
        let roomDocs = await getAllRooms();
        if (!roomDocs) return res.status(400).send();
        res.status(200).send(roomDocs);
      } catch {
        res.status(500).send();
      }
    })
    .get(RoomRoutes.GET_BACKGROUND_IMAGE, async (req, res) => {
      let id = req.params.id as string;
      try {
        let image = await getBackgroundImage(id);
        if (!image) return res.status(400).send();
        res.status(200).send(image.imageBuffer.toString('base64'));
      } catch {
        res.status(500).send();
      }
    })
    .post(RoomRoutes.SET_IMAGE, multer().single('image'), async (req, res) => {
      let roomId = req.params.id as string;
      try {
        await setBackgroundImage(roomId, { file: req.file });
        res.status(200).send();
      } catch {
        res.status(500).send();
      }
    })
    .post(RoomRoutes.UPDATE_CANVAS, async (req, res) => {
      let roomId = req.params.id as string;
      let data = req.body as Partial<Room>;
      try {
        let updatedRoom = await updateRoomValue(roomId, data);
        if (!updatedRoom) return res.status(400).send();
        res.status(200).send();
      } catch {
        res.status(500).send();
      }
    })
    .get(RoomRoutes.COUNT, async (req, res) => {
      try {
        const n = await roomCount();
        res.status(200).send(n.toString());
      } catch {
        res.status(500).send();
      }
    });

  return router;
}
