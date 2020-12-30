import { CanvasTools } from 'components/Canvas';
import { RoomState } from './room.context';

type Action =
  | { type: 'set_canvasTool'; payload: CanvasTools }
  | { type: 'set_color'; payload: string };

export const roomReducer = (state: RoomState, action: Action) => {
  switch (action.type) {
    case 'set_canvasTool': {
      return { ...state, selectedTool: action.payload };
    }
    case 'set_color': {
      return { ...state, color: action.payload };
    }
  }
};

export type RoomDispatch = (action: Action) => void;
