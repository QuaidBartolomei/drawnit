import { getSignature } from './cloudinary'

it('should get sig', async () => {
  const sig = await getSignature()
  console.log(sig)
  expect(sig).toBeTruthy()
})
