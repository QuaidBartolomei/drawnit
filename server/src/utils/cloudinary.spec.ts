import { getSignature } from './cloudinary'

it('should get sig', () => {
  const sig = getSignature()
  console.log(sig)
  expect(sig).toBeTruthy()
})
