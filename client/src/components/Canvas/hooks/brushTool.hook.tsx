import { distance, Vector2 } from '@graph-ts/vector2'
import { saveCanvasToDb } from 'apis/room.client.api'
import { useRoomState } from '../room.context'
import useSocket from 'components/Canvas/hooks/useSocket'
import React, { useState } from 'react'
import { drawBrushStroke, getImageString } from 'utils/canvas'
import { mousePositionCanvas, touchPositionCanvas } from 'utils/mouse'

export function useBrushTool(): React.HTMLProps<HTMLCanvasElement> {
  const [isPainting, setIsPainting] = useState(false)
  const [positions, setPositions] = useState<Vector2[]>([])
  const { color, canvasRef, _id } = useRoomState()
  const { sendBrushStroke } = useSocket()
  const lastPosition = () => positions[positions.length - 1]

  const onDown = (position: Vector2) => {
    setIsPainting(true)
    setPositions([position])
  }

  const onMove = (position: Vector2) => {
    if (!isPainting) return
    if (distance(position, lastPosition()) < 1) return
    drawBrushStroke(canvasRef, {
      positions: [position, lastPosition()],
      color,
    })
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
    onMouseUp: (e) => onEnd(),
    onMouseLeave: (e) => onEnd(),

    onTouchStart: (e) => onDown(touchPositionCanvas(e)),
    onTouchMove: (e) => onMove(touchPositionCanvas(e)),
    onTouchCancel: (e) => onEnd(),
    onTouchEnd: (e) => onEnd(),
    onClick: () => {},
  }
}
