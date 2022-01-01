import axios from 'axios'

type Settings = {
  cloudName: string | undefined
  uploadPreset: string | undefined
}

const defaultSettings: Settings = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
}

export async function uploadImageFile(file: File, settings = defaultSettings) {
  const { cloudName, uploadPreset } = settings
  if (!uploadPreset) return console.error('missing env variable: UPLOAD_PRESET')
  if (!cloudName) return console.error('missing env variable: CLOUD_NAME')

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  const res = await axios({
    method: 'POST',
    url,
    withCredentials: false,
    data: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
  return (
    (res?.data?.secure_url as string) || console.error(`Image upload failed`)
  )
}
