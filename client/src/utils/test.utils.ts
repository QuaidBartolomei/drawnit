import { readFileSync } from 'fs';
import { rest } from 'msw/lib/types';
import { setupServer } from 'msw/lib/types/node';
import { RoomClientRoutes, RoomRoutes } from 'routes/room.api.routes';

export const imageBuffer = readFileSync(__dirname + '/image.jpg');
export const imageBlob = new Blob([imageBuffer as BlobPart], {
  type: 'image/jpeg',
});
export const imageFile = imageBlob as File;

const exampleRoom = { backgroundImageId: '1' };

export function initServer() {
  return setupServer(
    rest.get(RoomClientRoutes('').GET_ROOM, (req, res, ctx) => {
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
}
