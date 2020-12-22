import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initMemoryDB } from 'loaders/db.memory.loader';

const mongod = new MongoMemoryServer({
  binary: {
    version: '3.6.3',
  },
});
beforeAll(async (done) => {
  await initMemoryDB(mongod);
  mongoose.connection.once('open', () => {
    done();
  });
});

afterAll(async (done) => {
  await mongoose.disconnect();
  await mongod.stop();
  done();
});

describe('...', () => {
  it('...', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
