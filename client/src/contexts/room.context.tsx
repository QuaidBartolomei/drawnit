import { CanvasTools } from 'components/Canvas';
import Room from 'interfaces/room.interface';
import React, { createContext, FC, useReducer } from 'react';
import {  RoomDispatch, roomReducer } from './room.reducer';
import { Socket } from 'socket.io-client';

export interface RoomState extends Room {
  selectedTool: CanvasTools;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  socket: Socket
}
const StateContext = createContext<RoomState | undefined>(undefined);
const DispatchContext = createContext<RoomDispatch | undefined>(undefined);
type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  room: Room;
  socket: Socket;
};

export const RoomContextProvider: FC<Props> = (props) => {
  const { children, canvasRef, room,socket } = props;
  const [state, dispatch] = useReducer(roomReducer, {
    ...room,
    selectedTool: CanvasTools.Brush,
    canvasRef,
    socket,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export function useRoomState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

export function useRoomDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a CountProvider');
  }
  return context;
}