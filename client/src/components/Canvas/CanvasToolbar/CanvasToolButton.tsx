import IconButton from '@material-ui/core/IconButton'

import { CanvasTool } from './canvasTool.schema'
import { CanvasToolType } from '../canvas.utils'
import { useRoomDispatch, useRoomState } from '../room.context'

export type CanvasToolButtonProps = CanvasTool

export default function CanvasToolButton(props: CanvasToolButtonProps) {
  const { label, id, icon } = props
  const roomDispatch = useRoomDispatch()
  const room = useRoomState()

  function setCanvasTool(tool: CanvasToolType) {
    roomDispatch({
      type: 'set_canvasTool',
      payload: tool,
    })
  }

  return (
    <IconButton
      aria-label={label}
      onClick={() => setCanvasTool(id)}
      key={label}
      color={room.selectedTool === id ? 'secondary' : 'default'}
    >
      {icon}
    </IconButton>
  )
}
