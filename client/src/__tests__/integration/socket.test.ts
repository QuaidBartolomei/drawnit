import { initSocket, SocketEvents } from 'apis/socket'
import { Socket } from 'socket.io-client'

let clientSocket: Socket
let clientSocketB: Socket

beforeAll(async () => {
  clientSocket = await initSocket()
  clientSocketB = await initSocket()
})
afterAll(async () => {
  clientSocket.disconnect()
})

test('initSocket successfully connects', async () => {
  expect(clientSocket.connected).toBeTruthy()
})

test('Socket joins room and receives join room event', (done) => {
  expect(clientSocket.connected).toBeTruthy()

  clientSocket.on(SocketEvents.JoinRoom, () => {
    done()
  })
  clientSocket.emit(SocketEvents.JoinRoom, 'roomid')
})

test('Socket A emits ping and Socket B receives', (done) => {
  const clientSocketA = clientSocket

  clientSocketB.on(SocketEvents.Ping, () => {
    clientSocketB.disconnect()
    done()
  })

  clientSocketA.emit(SocketEvents.Ping)
})
