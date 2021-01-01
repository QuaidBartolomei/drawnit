import { makeStyles, createStyles } from '@material-ui/core';
import Canvas from 'components/Canvas';
import { RoomContextProvider } from 'contexts/room.context';
import Room from 'interfaces/room.interface';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { getRoom } from 'apis/room.client.api';
import { initSocket, SocketEvents } from 'apis/socket.client.api';
import CanvasToolbar from 'components/CanvasToolbar';

const useStyles = makeStyles((theme) =>
  createStyles({
    canvasContainer: {
      backgroundImage: `linear-gradient(rgba(0,0,0, .3) .1em, transparent .1em), linear-gradient(90deg, rgba(0, 0, 0, .3) .1em, transparent .1em)`,
      backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
      backgroundSize: '3em 3em',
      backgroundColor: '#e3e2e5',
      height: '100vh',
      width: '100%',
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
    initSocket().then((socket) => {
      socket
        .on(SocketEvents.JoinRoom, () => {
          setSocket(socket);
        })
        .emit(SocketEvents.JoinRoom, roomId);
    });
  }, [roomId]);

  React.useEffect(() => {
    getRoom(roomId).then((room) => setRoom(room));
  }, [roomId, setRoom]);

  if (!socket) console.log('not ready');
  if (!room || !socket) return null;
  console.log('ready');

  return (
    <div className={classes.canvasContainer}>
      <RoomContextProvider room={room} canvasRef={canvasRef} socket={socket}>
        <CanvasToolbar />
        <Canvas ref={canvasRef} />
      </RoomContextProvider>
    </div>
  );
};

export default RoomPage;
