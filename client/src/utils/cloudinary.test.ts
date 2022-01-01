import { uploadImageFile } from './cloudinary'
import { imageFile } from './test'

it('should return url', async () => {
  expect(await uploadImageFile(imageFile)).toContain('.jpg')
})
