import { createStyles, makeStyles } from '@material-ui/core';
import { getRoom } from 'apis/room.client.api';
import { initSocket, SocketEvents } from 'apis/socket.client.api';
import Canvas from 'components/Canvas/Canvas';
import CanvasToolbar from 'components/Canvas/CanvasToolbar/CanvasToolbar';
import { ImageEditorProvider } from 'components/ImageEditor/imageEditor.context';
import { BackdroppedAlert } from 'components/BackdroppedAlert';
import Room from 'interfaces/room.interface';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import gridBackground from './grid-background';

const useStyles = makeStyles(theme =>
  createStyles({
    canvasContainer: {
      ...gridBackground,
      width: 'max-content',
      minHeight: '100vh',
      minWidth: '100vw',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export default function RoomPage() {
  const { id: roomId } = useParams<{ id: string }>();
  const [socket, setSocket] = React.useState<undefined | Socket>(undefined);

  const { data: room } = useQuery('getRoom', () => {
    return getRoom(roomId);
  });

  React.useEffect(() => {
    initSocket().then(socket => {
      socket
        .on(SocketEvents.JoinRoom, () => {
          setSocket(socket);
        })
        .on(SocketEvents.ReloadRoom, () => {
          window.location.reload(false);
        })
        .emit(SocketEvents.JoinRoom, roomId);
    });
  }, [roomId]);

  if (!room || !socket) return null;
  return <Ready room={room} socket={socket} />;
}

function Ready({ room, socket }: { room: Room; socket: Socket }) {
  const classes = useStyles();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return console.error('element with id "root" not found');
    scrollToMiddle(rootElement);
  }, []);
  return (
    <ImageEditorProvider
      room={{ ...room }}
      canvasRef={canvasRef}
      socket={socket}
    >
      <CanvasToolbar />
      <BackdroppedAlert />
      <div className={classes.canvasContainer}>
        <Canvas ref={canvasRef} />
      </div>
    </ImageEditorProvider>
  );
}

function scrollToMiddle(scrollingElement: HTMLElement) {
  const viewportWidth = window.innerWidth;
  const fullWidth = scrollingElement.scrollWidth;
  const midpoint = (fullWidth - viewportWidth) / 2;
  scrollingElement.scrollTo(midpoint, 0);
}
