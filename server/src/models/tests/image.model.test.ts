import { createAndSaveImageDocument, ImageModel } from 'models/image.model'
import { imageFile } from 'utils/test.utils'

beforeEach(async () => {
  await ImageModel.deleteMany({})
})

describe('create image document', () => {
  test('returns undefined for invalid file', async () => {
    const image = await createAndSaveImageDocument({})
    expect(image).toBeUndefined()
  })
  test('create image document', async () => {
    const encoding = 'base64'
    const mimeType = '/image/jpeg'
    const image = await createAndSaveImageDocument(imageFile)
    expect(image).toBeDefined()
    expect(image?.contentType).toBe(mimeType)
    expect(image?.imageBuffer.toString(encoding)).toBe(imageFile.encodedFile)
  })
})
