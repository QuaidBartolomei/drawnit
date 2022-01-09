import { v2 } from 'cloudinary'

type Settings = {
  api_key: string | undefined
  api_secret: string | undefined
}

const defaultSettings: Settings = {
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

interface SignData {
  signature: string
  timestamp: number
  api_key: string
}

export function getSignature(settings = defaultSettings): SignData {
  const { api_secret = '', api_key = '' } = settings
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = v2.utils.api_sign_request({ timestamp }, api_secret)
  return {
    timestamp,
    signature,
    api_key,
  }
}
