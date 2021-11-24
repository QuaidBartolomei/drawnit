import { readFileSync } from "fs";
import Room from "interfaces/room.interface";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { RoomRoutes } from "routes/room.api.routes";

window.URL.createObjectURL = () => "a";

export const imageBuffer = readFileSync(__dirname + "/image.jpg");
export const imageBlob = new Blob([imageBuffer as BlobPart], {
  type: "image/jpeg",
});
export const imageFile = imageBlob as File;

export function initServer(initialData: Room[] = []) {
  return setupServer(
    rest.post(RoomRoutes.CREATE_ROOM, (req, res, ctx) => {
      return res(ctx.json({ _id: "1" }));
    }),
    rest.post(RoomRoutes.SET_IMAGE, (req, res, ctx) => {
      return res(ctx.json({ _id: req.params.id, backgroundImageId: "1" }));
    }),
    rest.post(RoomRoutes.UPDATE_CANVAS, (req, res, ctx) => {
      return res(ctx.status(200));
    }),
    rest.get(RoomRoutes.GET_ROOM, (req, res, ctx) => {
      const queryId: string = req.params.id;
      if (!queryId) return res(ctx.status(500));
      return res(ctx.json({ _id: "example" }));
    }),
    rest.get(RoomRoutes.GET_BACKGROUND_IMAGE, (req, res, ctx) => {
      return res(ctx.text(imageBuffer.toString("base64")));
    })
  );
}
