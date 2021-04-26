import { setImage } from 'apis/room.client.api';
import { useRoomState } from 'components/ImageEditor/imageEditor.context';
import ImageUploadButton from 'components/ImageUploadButton';
import useSocket from 'components/useSocket';
import React from 'react';

export default function ChangeCanvasBackgroundButton() {
  const room = useRoomState();
  const { sendBackgroundImage } = useSocket();

  async function changeImage(file: File) {
    await setImage(room._id, file);
    sendBackgroundImage();
  }

  return (
    <ImageUploadButton onFileSelect={changeImage}>
      Set Background
    </ImageUploadButton>
  );
}
