import { setImage } from "utils/apis/room.client.api";
import { useRoomState } from "../room.context";
import ImageUploadButton from "components/ImageUploadButton";
import useSocket from "components/Canvas/hooks/useSocket";
import React from "react";

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
