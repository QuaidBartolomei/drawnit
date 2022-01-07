import useSocket from 'components/Canvas/hooks/useSocket'
import ImageUploadButton from 'components/ImageUploadButton'
import { uploadImageFile } from 'utils/cloudinary'
import { setImage } from 'utils/roomApi'
import { useRoomState } from '../room.context'

export default function ChangeCanvasBackgroundButton(): JSX.Element {
  const room = useRoomState()
  const { updateBackgroundIMage } = useSocket()

  async function changeImage(file: File) {
    const image = await uploadImageFile(file)
    if (!image) return
    await setImage(room._id, image)
    updateBackgroundIMage()
  }

  return <ImageUploadButton onFileSelect={(file) => changeImage(file)} />
}
