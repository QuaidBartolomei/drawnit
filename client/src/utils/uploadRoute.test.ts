import { getSig } from './cloudinary'
import { initServer } from './test'

const server = initServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('should get sig', async () => {
  const sig = await getSig()
  console.log(sig)
  expect(sig).toBeTruthy()
})
