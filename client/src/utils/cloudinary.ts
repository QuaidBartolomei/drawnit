import axios from 'axios'

type Settings = {
  cloudName: string | undefined
}

const defaultSettings: Settings = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
}

interface SignData {
  signature: string
  timestamp: string
  api_key: string
}

export type BackgroundImage = {
  height: number
  width: number
  secure_url: string
}

export const sigRoute = '/api/sig'

export async function getSignData(): Promise<SignData> {
  const res = await axios.get(sigRoute)
  const sig = res.data?.sig
  console.log('SIG:', sig)
  return sig
}

export async function uploadImageFile(
  file: File,
  settings = defaultSettings,
): Promise<BackgroundImage | void> {
  const { cloudName } = settings
  if (!cloudName) return console.error('missing env variable: CLOUD_NAME')
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const formData = new FormData()
  const sig = await getSignData()
  const { signature, api_key, timestamp } = sig
  formData.append('signature', signature)
  formData.append('api_key', api_key)
  formData.append('timestamp', timestamp)
  formData.append('file', file)
  try {
    const res = await axios({
      method: 'POST',
      url,
      data: formData,
    })
    return res.data
  } catch (err) {
    console.error(`Image upload failed:`, err)
  }
}
