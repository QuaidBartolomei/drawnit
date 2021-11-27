import { initDb } from 'loaders/db.loader'
import { createAndSaveImageDocument, ImageModel } from 'models/image.model'
import mongoose from 'mongoose'
import { imageFile } from 'utils/test.utils'

beforeAll(async () => {
  await initDb(process.env.MONGO_URL || '')
})

beforeEach(async () => {
  await ImageModel.deleteMany({})
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('create image document', () => {
  test('returns undefined for invalid file', async () => {
    let image = await createAndSaveImageDocument({})
    expect(image).toBeUndefined()
  })
  test('create image document', async () => {
    const encoding = 'base64'
    const mimeType = '/image/jpeg'
    let image = await createAndSaveImageDocument(imageFile)
    expect(image).toBeDefined()
    expect(image?.contentType).toBe(mimeType)
    expect(image?.imageBuffer.toString(encoding)).toBe(imageFile.encodedFile)
  })
})
