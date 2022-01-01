import { Socket } from 'socket.io-client'
import Room from 'interfaces/room.interface'

import { CanvasToolType } from './canvas.utils'

export type RoomState = Room & {
  selectedTool: CanvasToolType
  canvasRef: React.RefObject<HTMLCanvasElement>
  socket: Socket
  color: string
  showBackdrop: boolean
  backdropContent?: React.ReactNode
}
