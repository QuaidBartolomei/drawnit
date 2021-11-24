import { BrushStroke } from 'interfaces/brushStroke.interface'
import { io, Socket } from 'socket.io-client'

export const SocketEvents = {
  Connect: 'connect',
  Ping: 'USERVENT_PING',
  JoinRoom: 'USERVENT_JOIN_ROOM',
  UpdateCanvas: 'USEREVENT_UPDATE_CANVAS',
  ClearCanvas: 'USEREVENT_CLEAR_CANVAS',
  BrushStroke: 'USEREVENT_BRUSH_STROKE',
  BackgroundImage: 'USEREVENT_background_image',
  ReloadRoom: 'USEREVENT_reload_room',
}

export function initSocket() {
  const url =
    process.env.NODE_ENV === 'production'
      ? window.location.hostname
      : `${window.location.hostname}:4000`
  const clientSocket = io(url, {
    reconnectionDelay: 0,
    forceNew: true,
    transports: ['websocket'],
  })

  return new Promise<Socket>(function (resolve, reject) {
    clientSocket.on(SocketEvents.Connect, async () => {
      resolve(clientSocket) // done
    })
  })
}

export function sendBackgroundImage(
  roomId: string,
  socket: Socket,
  brushStroke: BrushStroke,
) {
  socket.emit(SocketEvents.BrushStroke, roomId, JSON.stringify(brushStroke))
}
export function sendBrushStroke(
  roomId: string,
  socket: Socket,
  brushStroke: BrushStroke,
) {
  socket.emit(SocketEvents.BrushStroke, roomId, JSON.stringify(brushStroke))
}

export function sendClearCanvas(roomId: string, socket: Socket) {
  socket.emit(SocketEvents.ClearCanvas, roomId)
}
