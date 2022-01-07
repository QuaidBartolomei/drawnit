import axios from 'axios'

type Settings = {
  cloudName: string | undefined
  uploadPreset: string | undefined
}

const defaultSettings: Settings = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
}

export const sigRoute = '/api/sig'

export async function getSig() {
  const res = await axios.get(sigRoute)
  const sig = res.data?.sig
  console.log('SIG:', sig)
  return sig
}

export type BackgroundImage = {
  height: number
  width: number
  secure_url: string
}

export async function uploadImageFile(
  file: File,
  settings = defaultSettings,
): Promise<BackgroundImage | void> {
  const { cloudName, uploadPreset } = settings
  if (!uploadPreset) return console.error('missing env variable: UPLOAD_PRESET')
  if (!cloudName) return console.error('missing env variable: CLOUD_NAME')
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const formData = new FormData()
  // const signature = await getSig()
  // formData.append('signature', signature)
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  try {
    const res = await axios({
      method: 'POST',
      url,
      withCredentials: false,
      data: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    return res.data
  } catch (err) {
    console.error(`Image upload failed:`, err)
  }
}
