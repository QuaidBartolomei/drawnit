import Canvas from 'components/Canvas/Canvas';
import CanvasToolbar from 'components/Canvas/CanvasToolbar';
import { ImageEditorProvider } from 'components/ImageEditor/imageEditor.context';
import Room from 'interfaces/room.interface';
import React from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
  room: Room;
}
export default function ImageEditor({ socket, room }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <ImageEditorProvider room={room} canvasRef={canvasRef} socket={socket}>
      <CanvasToolbar />
      <Canvas ref={canvasRef} />
    </ImageEditorProvider>
  );
}
