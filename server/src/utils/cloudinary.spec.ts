import { getSignature } from './cloudinary'

it('should get sig', () => {
  const sig = getSignature()
  const { signature, api_key, timestamp } = sig
  console.log(sig)
  expect(sig).toBeTruthy()
  expect(signature).toBeTruthy()
  expect(api_key).toBeTruthy()
  expect(timestamp).toBeTruthy()
})
