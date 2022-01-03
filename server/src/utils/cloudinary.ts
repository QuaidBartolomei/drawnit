import { v2 } from 'cloudinary'
import { Router } from 'express'

export const sigRoute = '/sig'

type Settings = {
  cloud_name: string | undefined
  upload_preset: string | undefined
  api_key: string | undefined
  api_secret: string | undefined
}

const defaultSettings: Settings = {
  cloud_name: process.env.CLOUD_NAME,
  upload_preset: process.env.UPLOAD_PRESET,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

export async function getSignature(settings = defaultSettings) {
  const { api_secret = '' } = settings
  const timestamp = Math.round(new Date().getTime() / 1000)
  return v2.utils.api_sign_request({ timestamp }, api_secret)
}

export const cloudinaryController = Router().get(sigRoute, async (req, res) => {
  const sig = await getSignature()
  res.status(200).send(sig)
})
