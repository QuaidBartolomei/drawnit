import mongoose, { Schema } from 'mongoose'
import Image from 'interfaces/image.interface'

const collectionName = 'Image'
const ENCODING = 'base64'

interface ImageData {
  imageBuffer: Buffer
  contentType: string
  _id: string
}

export type ImageDocument = Image & mongoose.Document

export type ImageFile = {
  file: Express.Multer.File
  encodedFile: string
  mimeType: string
}

const imageSchema = new Schema({
  contentType: {
    type: String,
    default: '',
  },
  imageBuffer: {
    type: Buffer,
    default: '',
  },
})
export const ImageModel = mongoose.model<ImageDocument>(
  collectionName,
  imageSchema,
)
export function createAndSaveImageDocument({
  file,
  encodedFile,
  mimeType,
}: Partial<ImageFile>): Promise<ImageDocument> | undefined {
  const encodedImg = encodedFile || file?.buffer.toString(ENCODING) || undefined
  if (!encodedImg) return undefined
  const imageBuffer = Buffer.from(encodedImg, ENCODING)
  const contentType = file?.mimetype || mimeType || ''
  const imageData: Partial<ImageData> = { contentType, imageBuffer }
  const image = new ImageModel(imageData)
  return image.save()
}
