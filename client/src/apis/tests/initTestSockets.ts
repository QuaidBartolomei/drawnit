import { createServer } from 'http';
import { Server, Socket as ServerSocket } from 'socket.io';
import { io, Socket as ClientSocket } from 'socket.io-client';

export const initTestSockets = async () => {
  const httpServer = createServer();
  const server = new Server(httpServer);
  return new Promise<{
    server: Server;
    clientSocket: ClientSocket;
    serverSocket: ServerSocket;
  }>((resolve, reject) => {
    let serverSocket: ServerSocket;
    httpServer.listen(() => {
      const { port } = httpServer.address() as {
        address: string;
        port: number;
      };
      const clientSocket = io(`http://localhost:${port}`);
      server.on('connection', socket => {
        serverSocket = socket;
      });
      clientSocket.on('connect', () =>
        resolve({
          server,
          clientSocket,
          serverSocket,
        })
      );
    });
  });
};
