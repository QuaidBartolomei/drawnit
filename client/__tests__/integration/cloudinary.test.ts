import { getSignData, uploadImageFile } from 'utils/cloudinary'
import { imageFile } from 'utils/test'

it('should get sig', async () => {
  const { signature, api_key, timestamp } = await getSignData()
  expect(signature).toBeTruthy()
  expect(api_key).toBeTruthy()
  expect(timestamp).toBeTruthy()
})

it('should return url, height, width', async () => {
  const data = await uploadImageFile(imageFile)
  expect(data).toBeTruthy()
  expect(data?.secure_url).toContain('.jpg')
  expect(data?.width).toBe(324)
  expect(data?.height).toBe(329)
})
