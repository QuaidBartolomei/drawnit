import express from 'express'
import { initApp } from 'loaders/app.loader'
import request from 'supertest'

const TEST_ROUTE = '/test'
const app = express()

beforeAll(() => {
  initApp(app)
})

test('Express app successfully listens when initApp is called', (done) => {
  app.get(TEST_ROUTE, (req, res) => {
    res.status(200).send()
  })
  request(app).get(TEST_ROUTE).expect(200, done)
})
