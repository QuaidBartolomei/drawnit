import { setImage } from 'apis/room'
import { useRoomState } from '../room.context'
import ImageUploadButton from 'components/ImageUploadButton'
import useSocket from 'components/Canvas/hooks/useSocket'

export default function ChangeCanvasBackgroundButton(): JSX.Element {
  const room = useRoomState()
  const { sendBackgroundImage } = useSocket()

  async function changeImage(file: File) {
    await setImage(room._id, file)
    sendBackgroundImage()
  }

  return (
    <ImageUploadButton onFileSelect={changeImage}>
      Set Background
    </ImageUploadButton>
  )
}
