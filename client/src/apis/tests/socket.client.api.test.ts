import { Socket } from 'socket.io-client';
import { initSocket, SocketEvents } from 'apis/socket.client.api';

let clientSocket: Socket;

beforeAll(async () => {
  clientSocket = await initSocket();
});
afterAll(async () => {
  clientSocket.disconnect();
});

test('initSocket successfully connects', async () => {
  expect(clientSocket.connected).toBeTruthy();
});

test('Socket joins room and receives join room event', async (done) => {
  expect(clientSocket.connected).toBeTruthy();

  clientSocket.on(SocketEvents.JoinRoom, () => {
    done();
  });
  clientSocket.emit(SocketEvents.JoinRoom, 'roomid');
});

test('Socket A emits ping and Socket B receives', async (done) => {
  function resolve() {
    clientSocketB.disconnect();
    done();
  }
  const clientSocketA = clientSocket;
  const clientSocketB = await initSocket();
  expect(clientSocketB.connected).toBeTruthy();

  clientSocketB.on(SocketEvents.Ping, () => {
    resolve();
  });

  clientSocketA.emit(SocketEvents.Ping);
});
