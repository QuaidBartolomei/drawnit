import axios from 'axios'
import { readFileSync } from 'fs'
import env from 'utils/env.utils'

export const imageFile: {
  encodedFile: string
  mimeType: string
} = {
  encodedFile: readFileSync(__dirname + '/image.jpg', 'base64'),
  mimeType: '/image/jpeg',
}

export async function getAuth0Token() {
  const url = `https://${env.AUTH0_DOMAIN}/oauth/token`
  const data = {
    client_id: env.AUTH0_CLIENT_ID,
    client_secret: env.AUTH0_CLIENT_SECRET,
    audience: env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  }
  const res = await axios.post(url, data)
  return `${res.data.token_type} ${res.data.access_token}`
}
