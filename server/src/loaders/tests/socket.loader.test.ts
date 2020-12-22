import { initApp } from 'loaders/express.loader';
import { initSocketServer, SocketEvents } from 'loaders/socket.loader';
import { io, Socket as ClientSocket } from 'socket.io-client';

const httpServer = initApp();
const ioServer = initSocketServer(httpServer);
const address = httpServer.address() as { address: string; port: number };
const url = `http://[${address.address}]:${address.port}`;

let clientSocket: ClientSocket;

afterAll(() => {
  ioServer?.close();
  httpServer?.close();
});

beforeEach((done) => {
  clientSocket = io(url, {
    reconnectionDelay: 0,
    forceNew: true,
    transports: ['websocket'],
  });
  clientSocket.on('connect', () => {
    done();
  });
});

afterEach(() => {
  if (clientSocket.connected) {
    clientSocket.disconnect();
  }
});

test('socket should be connected', () => {
  expect(clientSocket.connected).toBeTruthy();
});

test('join socket room emission triggers join room event received', (done) => {
  const controlRoom = 'control';
  clientSocket.on(SocketEvents.JoinRoom, () => {
    done();
  });
  clientSocket.emit(SocketEvents.JoinRoom, controlRoom);
});

test('socket event brush stroke', (done) => {
  const controlRoom = 'control';
  clientSocket.on(SocketEvents.JoinRoom, () => {
    clientSocket.emit(SocketEvents.BrushStroke, controlRoom, );

    done();
  });
  clientSocket.emit(SocketEvents.JoinRoom, controlRoom);
});
