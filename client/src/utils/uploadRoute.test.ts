import { getSignData } from './cloudinary'
import { initServer } from './test'

const server = initServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('should get sig', async () => {
  const sig = await getSignData()
  const { signature, api_key, timestamp } = sig
  console.log(sig)
  expect(sig).toBeTruthy()
  expect(signature).toBeTruthy()
  expect(api_key).toBeTruthy()
  expect(timestamp).toBeTruthy()
})
