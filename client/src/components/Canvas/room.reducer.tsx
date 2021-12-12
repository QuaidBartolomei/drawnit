import { CanvasTools } from 'components/Canvas/Canvas'
import { drawBrushStroke } from 'components/Canvas/canvas.utils'
import { BrushStroke } from 'interfaces/brushStroke.interface'

import { RoomState } from './room.context'

type Action =
  | { type: 'set_canvasTool'; payload: CanvasTools }
  | { type: 'set_color'; payload: string }
  | { type: 'reload' }
  | { type: 'set_background_image_url'; payload: string }
  | { type: 'show_backdrop'; payload: boolean }
  | { type: 'set_backdrop_content'; payload: React.ReactNode }
  | { type: 'draw_brush_stroke'; payload: BrushStroke }

export const roomReducer = (state: RoomState, action: Action): RoomState => {
  switch (action.type) {
    case 'set_canvasTool': {
      return { ...state, selectedTool: action.payload }
    }
    case 'set_color': {
      return { ...state, color: action.payload }
    }
    case 'set_background_image_url': {
      return { ...state, backgroundImageUrl: action.payload }
    }
    case 'reload': {
      return { ...state }
    }
    case 'show_backdrop': {
      return { ...state, showBackdrop: action.payload }
    }
    case 'set_backdrop_content': {
      return { ...state, backdropContent: action.payload }
    }
    case 'draw_brush_stroke': {
      drawBrushStroke(state.canvasRef, action.payload)
      return state
    }
  }
}

export type RoomDispatch = (action: Action) => void
