import { uploadImageFile } from './cloudinary'
import { imageFile } from './test'

it('should return url', async () => {
  const data = await uploadImageFile(imageFile)
  expect(data).toBeTruthy()
  expect(data?.secure_url).toContain('.jpg')
  expect(data?.width).toBe(324)
  expect(data?.height).toBe(329)
})
