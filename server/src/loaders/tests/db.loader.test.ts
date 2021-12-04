import mongoose from 'mongoose'

describe('DB Test', () => {
  test('test if db connects to test environment successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1)
  })
})
