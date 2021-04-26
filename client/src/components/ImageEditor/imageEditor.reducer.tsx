import { setImage } from 'apis/room.client.api';
import { CanvasTools } from 'components/Canvas/Canvas';
import { RoomState } from './imageEditor.context';

type Action =
  | { type: 'set_canvasTool'; payload: CanvasTools }
  | { type: 'set_color'; payload: string }
  | { type: 'set_background_image'; payload: File };

export const roomReducer = (state: RoomState, action: Action) => {
  switch (action.type) {
    case 'set_canvasTool': {
      return { ...state, selectedTool: action.payload };
    }
    case 'set_color': {
      return { ...state, color: action.payload };
    }
    case 'set_background_image': {
      setImage(state._id, action.payload);
      return { ...state };
    }
  }
};

export type RoomDispatch = (action: Action) => void;
