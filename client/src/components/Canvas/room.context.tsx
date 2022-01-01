import { isMobile } from 'is-mobile'
import { createContext, PropsWithChildren, useContext, useReducer } from 'react'
import { Socket } from 'socket.io-client'
import Room from 'interfaces/room.interface'

import { CanvasToolType } from './canvas.utils'
import { RoomDispatch, roomReducer } from './room.reducer'
import { RoomState } from './room.schema'

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  room: Room
  socket: Socket
}

const defaultTool: CanvasToolType = isMobile({ tablet: true }) ? 'pan' : 'brush'

const StateContext = createContext<RoomState | undefined>(undefined)
const DispatchContext = createContext<RoomDispatch | undefined>(undefined)

export function RoomProvider(props: PropsWithChildren<Props>) {
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
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export function useRoomDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a CountProvider')
  }
  return context
}
