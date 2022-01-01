import { distance, Vector2 } from '@graph-ts/vector2'
import React, { useState } from 'react'
import { getImageString } from 'components/Canvas/canvas.utils'
import useSocket from 'components/Canvas/hooks/useSocket'
import { mousePositionCanvas, touchPositionCanvas } from 'utils/mouse'
import { saveCanvasToDb } from 'utils/roomApi'

import { useRoomDispatch, useRoomState } from '../room.context'

export function useBrushTool(): React.HTMLProps<HTMLCanvasElement> {
  const [isPainting, setIsPainting] = useState(false)
  const [positions, setPositions] = useState<Vector2[]>([])
  const { color, canvasRef, _id } = useRoomState()
  const roomDispatch = useRoomDispatch()
  const { sendBrushStroke } = useSocket()
  const lastPosition = () => positions[positions.length - 1]

  const onDown = (position: Vector2) => {
    setIsPainting(true)
    setPositions([position])
  }

  const onMove = (position: Vector2) => {
    if (!isPainting) return
    if (distance(position, lastPosition()) < 1) return
    const brushStroke = {
      positions: [position, lastPosition()],
      color,
      size: 3,
    }
    roomDispatch({ type: 'draw_brush_stroke', payload: brushStroke })
    setPositions([...positions, position])
  }

  const onEnd = () => {
    if (!isPainting) return
    setIsPainting(false)
    saveCanvasToDb(_id, getImageString(canvasRef))
    sendBrushStroke({
      color,
      positions,
      size: 3,
    })
  }

  return {
    style: {
      cursor: 'crosshair',
      touchAction: 'none',
    },
    onMouseDown: (e) => onDown(mousePositionCanvas(e)),
    onMouseMove: (e) => onMove(mousePositionCanvas(e)),
    onMouseUp: () => onEnd(),
    onMouseLeave: () => onEnd(),

    onTouchStart: (e) => onDown(touchPositionCanvas(e)),
    onTouchMove: (e) => onMove(touchPositionCanvas(e)),
    onTouchCancel: () => onEnd(),
    onTouchEnd: () => onEnd(),
    onClick: () => {},
  }
}
