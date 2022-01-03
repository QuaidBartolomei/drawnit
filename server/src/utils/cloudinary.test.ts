import express from 'express'
import request from 'supertest'
import { initApp } from 'loaders/app.loader'
import { getSignature, sigRoute } from './cloudinary'

const app = express()
beforeAll(async () => {
  initApp(app)
})

it('should get sig', async () => {
  const sig = await getSignature()
  console.log(sig)
  expect(sig).toBeTruthy()
})

it('should return sig on api call', async () => {
  await request(app)
    .get(sigRoute)
    .expect((res) => {
      console.log(res.text)
      expect(res.text).toBeTruthy()
    })
})
