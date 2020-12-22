import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import env from 'utils/env.utils';

export const SocketEvents = {
  Connect: 'connection',
  Ping: 'USERVENT_PING',
  JoinRoom: 'USERVENT_JOIN_ROOM',
  UpdateCanvas: 'USEREVENT_UPDATE_CANVAS',
  ClearCanvas: 'USEREVENT_CLEAR_CANVAS',
  BrushStroke: 'USEREVENT_BRUSH_STROKE',
};

const origin = `http://${env.HOST}:${env.PORT}`;

export const initSocketServer = (server: HttpServer) => {
  const sockerIOServer = new Server(server, {
    cors: {
      origin,
    },
  });
  sockerIOServer.on(SocketEvents.Connect, (clientSocket: Socket) => {
    clientSocket
      .on(SocketEvents.Ping, () => {
        sockerIOServer.emit(SocketEvents.Ping);
      })
      .on(SocketEvents.JoinRoom, (roomId: string) => {
        clientSocket.join(roomId);
        clientSocket.emit(SocketEvents.JoinRoom);
      })
      .on(SocketEvents.BrushStroke, (roomId: string, brushStroke: string) => {
        clientSocket.to(roomId).emit(SocketEvents.BrushStroke, brushStroke);
      })
      .on(SocketEvents.ClearCanvas, (roomId: string) => {
        clientSocket.to(roomId).emit(SocketEvents.ClearCanvas);
      });
  });
  return sockerIOServer;
};
