import { CanvasTools } from 'components/Canvas/Canvas'
import Room from 'interfaces/room.interface'
import React, { createContext, FC, useReducer } from 'react'
import { RoomDispatch, roomReducer } from './room.reducer'
import { Socket } from 'socket.io-client'
import isMobile from 'is-mobile'

export type RoomState = Room & {
  selectedTool: CanvasTools
  canvasRef: React.RefObject<HTMLCanvasElement>
  socket: Socket
  color: string
  showBackdrop: boolean
  backdropContent?: React.ReactNode
}

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  room: Room
  socket: Socket
}

const defaultTool: CanvasTools = isMobile({ tablet: true })
  ? CanvasTools.Pan
  : CanvasTools.Brush

export const RoomProvider: FC<Props> = (props) => {
  const { children, canvasRef, room, socket } = props
  const initialState: RoomState = {
    ...room,
    selectedTool: defaultTool,
    canvasRef,
    socket,
    color: '#000000',
    showBackdrop: false,
  }

  const [state, dispatch] = useReducer(roomReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useRoomState() {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export function useRoomDispatch() {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a CountProvider')
  }
  return context
}

const StateContext = createContext<RoomState | undefined>(undefined)
const DispatchContext = createContext<RoomDispatch | undefined>(undefined)