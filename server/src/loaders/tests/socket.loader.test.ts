import { initApp } from 'loaders/app.loader'
import { initServer } from 'loaders/express.loader'
import { initSocketServer, SocketEvents } from 'loaders/socket.loader'
import { io, Socket as ClientSocket } from 'socket.io-client'

const app = initApp()
const httpServer = initServer(app)
const ioServer = initSocketServer(httpServer)
const address = httpServer.address() as { address: string; port: number }
const url = `http://[${address.address}]:${address.port}`
const roomId = 'x'

let clientSocket: ClientSocket
let otherClientSocket: ClientSocket

const newClientSocket = () =>
  io(url, {
    reconnectionDelay: 0,
    forceNew: true,
    transports: ['websocket'],
  })

afterAll(() => {
  ioServer?.close()
  httpServer?.close()
})

beforeEach((done) => {
  clientSocket = newClientSocket()
  otherClientSocket = newClientSocket()
  clientSocket.on('connect', () => {
    done()
  })
})

afterEach(() => {
  clientSocket.disconnect()
  otherClientSocket.disconnect()
})

test('socket should be connected', () => {
  expect(clientSocket.connected).toBeTruthy()
})

test('join socket room emission triggers join room event received', (done) => {
  const controlRoom = 'control'
  clientSocket.on(SocketEvents.JoinRoom, () => {
    done()
  })
  clientSocket.emit(SocketEvents.JoinRoom, controlRoom)
})

test('socket event brush stroke', (done) => {
  const data = {
    roomId: 'x',
    brushStroke: 'y',
  }
  clientSocket.on(SocketEvents.BrushStroke, (brushStroke: string) => {
    expect(brushStroke).toEqual(data.brushStroke)
    done()
  })
  clientSocket.on(SocketEvents.JoinRoom, () => {
    otherClientSocket.emit(
      SocketEvents.BrushStroke,
      data.roomId,
      data.brushStroke,
    )
  })
  clientSocket.emit(SocketEvents.JoinRoom, data.roomId)
})

test('socket event clear canvas', (done) => {
  clientSocket.on(SocketEvents.ClearCanvas, () => {
    done()
  })
  clientSocket.on(SocketEvents.JoinRoom, () => {
    otherClientSocket.emit(SocketEvents.ClearCanvas, roomId)
  })
  clientSocket.emit(SocketEvents.JoinRoom, roomId)
})

test('socket event background image', (done) => {
  clientSocket.on(SocketEvents.ReloadRoom, () => {
    done()
  })
  clientSocket.on(SocketEvents.JoinRoom, () => {
    otherClientSocket.emit(SocketEvents.BackgroundImage, roomId)
  })
  clientSocket.emit(SocketEvents.JoinRoom, roomId)
})

test('socket event ping', (done) => {
  clientSocket.on(SocketEvents.Ping, () => {
    done()
  })
  clientSocket.on(SocketEvents.JoinRoom, () => {
    otherClientSocket.emit(SocketEvents.Ping, roomId)
  })
  clientSocket.emit(SocketEvents.JoinRoom, roomId)
})
