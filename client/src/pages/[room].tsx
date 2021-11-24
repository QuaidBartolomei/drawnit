import { createStyles, makeStyles } from "@material-ui/core";
import { getRoom } from "apis/room.client.api";
import { initSocket, SocketEvents } from "apis/socket.client.api";
import { BackdroppedAlert } from "components/BackdroppedAlert";
import Canvas from "components/Canvas/Canvas";
import CanvasToolbar from "components/Canvas/CanvasToolbar/CanvasToolbar";
import { RoomProvider } from "components/Canvas/room.context";
import Room from "interfaces/room.interface";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { scrollToMiddle } from "utils/scroll";
import gridBackground from "./Room/grid-background";

const useStyles = makeStyles((theme) =>
  createStyles({
    canvasContainer: {
      ...gridBackground,
      width: "max-content",
      minHeight: "100vh",
      minWidth: "100vw",
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

type Params = {
  room: string;
};

interface Props {
  room: Room;
  socket: Socket;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { room: roomId } = context.params || { room: "" };
  const room = await getRoom(roomId);
  if (!room) return { notFound: true };
  const socket = await initSocket();
  socket
    .on(SocketEvents.JoinRoom, () => {})
    .on(SocketEvents.ReloadRoom, () => {
      window.location.reload();
    })
    .emit(SocketEvents.JoinRoom, roomId);
  return { props: { room, socket } };
};

export default function RoomPage({ room, socket }: Props) {
  const classes = useStyles();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    scrollToMiddle("root");
  }, []);

  if (!socket) return <div>loading...</div>;

  return (
    <RoomProvider room={{ ...room }} canvasRef={canvasRef} socket={socket}>
      <CanvasToolbar />
      <BackdroppedAlert />
      <div className={classes.canvasContainer}>
        <Canvas ref={canvasRef} />
      </div>
    </RoomProvider>
  );
}
