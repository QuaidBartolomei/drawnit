import { Router } from 'express'
import { getSignature } from 'utils/cloudinary'

export const sigRoute = '/sig'

export const cloudinaryController = Router().get(sigRoute, (req, res) => {
  console.log('getting upload signature')
  const sig = getSignature()
  if (!sig) res.status(400).send()
  res.status(200).send(sig)
})
