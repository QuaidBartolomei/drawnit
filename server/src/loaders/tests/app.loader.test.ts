import request from 'supertest'
import { Server } from 'http'
import express from 'express'
import { initApp } from 'loaders/app.loader'

const TEST_ROUTE = '/test'
const app = express()
let expressServer: Server

beforeAll(() => {
  initApp(app)
})

test('Express app successfully listens when initApp is called', async () => {
  app.get(TEST_ROUTE, (req, res) => {
    res.status(200).send()
  })
  request(app).get(TEST_ROUTE).expect(200)
})
