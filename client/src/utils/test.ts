import { readFileSync } from 'fs'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { RoomRoutes } from 'routes'
import { sigRoute } from './cloudinary'

window.URL.createObjectURL = () => 'a'

export const imageBuffer = readFileSync(`${__dirname}/image.jpg`)
export const imageBlob = new Blob([imageBuffer as BlobPart], {
  type: 'image/jpeg',
})
export const imageFile = imageBlob as File

export function initServer() {
  return setupServer(
    rest.post(RoomRoutes.CREATE_ROOM, (req, res, ctx) =>
      res(ctx.json({ _id: '1' })),
    ),
    rest.post(RoomRoutes.SET_IMAGE, (req, res, ctx) =>
      res(
        ctx.json({
          _id: req.params.id,
          backgroundImageUrl: req.params.secure_url,
        }),
      ),
    ),
    rest.post(RoomRoutes.UPDATE_CANVAS, (req, res, ctx) =>
      res(ctx.status(200)),
    ),
    rest.get(RoomRoutes.GET_ROOM, (req, res, ctx) => {
      const queryId: string = req.params.id
      if (!queryId) return res(ctx.status(500))
      return res(ctx.json({ _id: 'example' }))
    }),
    rest.get(RoomRoutes.GET_BACKGROUND_IMAGE, (req, res, ctx) =>
      res(ctx.text(imageBuffer.toString('base64'))),
    ),
    rest.get(sigRoute, (req, res, ctx) =>
      res(
        ctx.json({
          sig: {
            signature: '1',
            timestamp: '1',
            api_key: '1',
          },
        }),
      ),
    ),
  )
}
