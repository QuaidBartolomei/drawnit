import { CanvasTools } from 'components/Canvas';
import { RoomState } from './room.context';

type Action = { type: 'set_canvasTool'; payload: CanvasTools };

export const roomReducer = (state: RoomState, action: Action) => {
  switch (action.type) {
    case 'set_canvasTool': {
      return { ...state, selectedTool: action.payload };
    }
  }
};

export type RoomDispatch = (action: Action) => void;
