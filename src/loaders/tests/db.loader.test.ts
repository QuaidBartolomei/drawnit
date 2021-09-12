import { initDb } from 'loaders/db.loader';
import mongoose from 'mongoose';

describe('DB Test', () => {
  beforeAll(async () => {
    await initDb(process.env.MONGO_URL || '');
    mongoose.connection.readyState;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test if db connects to test environment successfully', async (done) => {
    await initDb(process.env.MONGO_URL || '');
    expect(mongoose.connection.readyState).toBe(1);
    await mongoose.disconnect();
    done();
  });
});
