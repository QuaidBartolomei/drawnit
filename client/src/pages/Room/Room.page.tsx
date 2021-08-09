import { createStyles, makeStyles } from '@material-ui/core';
import { getRoom } from 'apis/room.client.api';
import { initSocket, SocketEvents } from 'apis/socket.client.api';
import Canvas from 'components/Canvas/Canvas';
import CanvasToolbar from 'components/Canvas/CanvasToolbar';
import { ImageEditorProvider } from 'components/ImageEditor/imageEditor.context';
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
      [theme.breakpoints.up('lg')]: {
        width: '100%',
      },
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spacer: {
      width: 100,
      minHeight: 100,
      display: 'block',
      backgroundColor: 'red',
    },
  })
);

export default function RoomPage() {
  const { id: roomId } = useParams<{ id: string }>();
  const [socket, setSocket] = React.useState<undefined | Socket>(undefined);

  const {
    isLoading,
    isError,
    data: room,
  } = useQuery('getRoom', () => {
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
    const width = rootElement.offsetWidth;
    const midpoint = width;
    rootElement.scrollTo(midpoint, 0);
  }, []);
  return (
    <ImageEditorProvider
      room={{ ...room }}
      canvasRef={canvasRef}
      socket={socket}
    >
      <CanvasToolbar />
      <div className={classes.canvasContainer}>
        <Canvas ref={canvasRef} />
      </div>
    </ImageEditorProvider>
  );
}
