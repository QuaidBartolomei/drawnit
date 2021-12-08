import { setImage } from 'apis/room'
import useSocket from 'components/Canvas/hooks/useSocket'
import ImageUploadButton from 'components/ImageUploadButton'

import { useRoomState } from '../room.context'

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
