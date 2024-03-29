import { BrushStroke } from 'interfaces/brushStroke.interface'
import { SocketEvents } from 'utils/socket'

import { useRoomState } from '../room.context'

export default function useSocket() {
  const { _id: roomId, socket } = useRoomState()

  return {
    updateBackgroundIMage: () => {
      socket.emit(SocketEvents.BackgroundImage, roomId)
    },
    sendBrushStroke: (brushStroke: BrushStroke) => {
      socket.emit(SocketEvents.BrushStroke, roomId, JSON.stringify(brushStroke))
    },
    sendClearCanvas: () => {
      socket.emit(SocketEvents.ClearCanvas, roomId)
    },
  }
}
