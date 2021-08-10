import { CanvasTools } from 'components/Canvas/Canvas';
import { RoomState } from './imageEditor.context';

type Action =
  | { type: 'set_canvasTool'; payload: CanvasTools }
  | { type: 'set_color'; payload: string }
  | { type: 'reload' }
  | { type: 'set_background_image_url'; payload: string }
  | { type: 'show_backdrop'; payload: boolean };

export const roomReducer = (state: RoomState, action: Action): RoomState => {
  switch (action.type) {
    case 'set_canvasTool': {
      return { ...state, selectedTool: action.payload };
    }
    case 'set_color': {
      return { ...state, color: action.payload };
    }
    case 'set_background_image_url': {
      return { ...state, backgroundImageUrl: action.payload };
    }
    case 'reload': {
      return { ...state };
    }
    case 'show_backdrop': {
      return { ...state, showBackdrop: action.payload };
    }
  }
};

export type RoomDispatch = (action: Action) => void;
