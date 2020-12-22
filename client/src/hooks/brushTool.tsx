import { distance, Vector2 } from '@graph-ts/vector2';
import { useRoomState } from 'contexts/room.context';
import React, { useState } from 'react';
import { drawBrushStroke, getImageString } from 'utils/canvas.utils';
import { mousePositionCanvas, touchPositionScreen } from 'utils/mouse.utils';
import { saveCanvasToDb } from 'apis/room.api';
import { sendBrushStroke } from 'apis/socket.api';

export function useBrushTool(): React.HTMLProps<HTMLCanvasElement> {
  const [isPainting, setIsPainting] = useState(false);
  const [positions, setPositions] = useState<Vector2[]>([]);
  const [lastPosition, setLastPosition] = useState<Vector2>({ x: 0, y: 0 });
  const room = useRoomState();

  const onDown = (position: Vector2) => {
    console.log('brush down', position);
    setIsPainting(true);
    setPositions([position]);
    setLastPosition(position);
  };

  const onMove = (position: Vector2) => {
    if (!isPainting) return;
    if (distance(position, lastPosition) < 1) return;
    drawBrushStroke(room.canvasRef, { positions: [position, lastPosition] });
    setLastPosition(position);
    setPositions([...positions, position]);
  };

  const onEnd = () => {
    if (!isPainting) return;
    setIsPainting(false);
    saveCanvasToDb(room._id, getImageString(room.canvasRef));
    sendBrushStroke(room._id, room.socket, {
      color: 'red',
      positions,
      size: 3,
    });
  };

  return {
    onMouseDown: (e) => onDown(mousePositionCanvas(e)),
    onMouseMove: (e) => onMove(mousePositionCanvas(e)),
    onMouseUp: (e) => onEnd(),
    onMouseLeave: (e) => onEnd(),

    onTouchStart: (e) => onDown(touchPositionScreen(e)),
    onTouchMove: (e) => onMove(touchPositionScreen(e)),
    onTouchCancel: (e) => onEnd(),
    onTouchEnd: (e) => onEnd(),
    onClick: () => {},
  };
}
