import { createStyles, makeStyles } from '@material-ui/core';
import { getRoom } from 'apis/room.client.api';
import { initSocket, SocketEvents } from 'apis/socket.client.api';
import Canvas from 'components/Canvas/Canvas';
import CanvasToolbar from 'components/Canvas/CanvasToolbar';
import { ImageEditorProvider } from 'components/ImageEditor/imageEditor.context';
import Room from 'interfaces/room.interface';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

const useStyles = makeStyles(theme =>
  createStyles({
    canvasContainer: {
      backgroundImage: `linear-gradient(rgba(0,0,0, .3) .1em, transparent .1em), linear-gradient(90deg, rgba(0, 0, 0, .3) .1em, transparent .1em)`,
      backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
      backgroundSize: '3em 3em',
      backgroundColor: '#e3e2e5',
      minHeight: '100vh',
      minWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&>*': {
        margin: '0.5rem',
      },
    },
  })
);

const RoomPage = () => {
  const classes = useStyles();
  const { id: roomId } = useParams<{ id: string }>();
  const [room, setRoom] = React.useState<Room | undefined>(undefined);
  const [socket, setSocket] = React.useState<undefined | Socket>(undefined);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId, setRoom]);

  if (!room || !socket) return null;

  return (
    <div className={classes.canvasContainer}>
      <ImageEditorProvider
        room={{ ...room }}
        canvasRef={canvasRef}
        socket={socket}
      >
        <CanvasToolbar />
        <Canvas ref={canvasRef} />
      </ImageEditorProvider>
    </div>
  );
};

export default RoomPage;
