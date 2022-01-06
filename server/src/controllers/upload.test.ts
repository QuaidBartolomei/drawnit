import express from 'express'
import request from 'supertest'
import { sigRoute } from 'controllers/upload'
import { initApp } from 'loaders/app.loader'

const app = express()
beforeAll(() => {
  initApp(app)
})

it('should return sig on api call', async () => {
  await request(app)
    .get(sigRoute)
    .expect((res) => {
      console.log(res.text)
      expect(res.text).toBeTruthy()
    })
})
