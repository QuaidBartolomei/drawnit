import { SocketEvents } from 'apis/socket.client.api';
import { Server, Socket as ServerSocket } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';
import { initTestSockets } from './initTestSockets';

let server: Server;
let clientSocket: ClientSocket;
let serverSocket: ServerSocket;

beforeAll(async () => {
  const x = await initTestSockets();
  server = x.server;
  clientSocket = x.clientSocket;
  serverSocket = x.serverSocket;
  expect(clientSocket.connected).toBeTruthy();
});

afterAll(() => {
  server.close();
  clientSocket.close();
});

test('should work', done => {
  clientSocket.on('hello', (arg: string) => {
    expect(arg).toBe('world');
    done();
  });
  serverSocket.emit('hello', 'world');
});

test('Socket joins room and receives join room event', done => {
  serverSocket.on(SocketEvents.JoinRoom, (roomId, cb) => {
    cb(roomId);
  });
  clientSocket.emit(SocketEvents.JoinRoom, 'roomid', (arg: string) => {
    expect(arg).toBe('roomid');
    done();
  });
});
