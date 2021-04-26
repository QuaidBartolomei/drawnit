import { distance, Vector2 } from '@graph-ts/vector2';
import { saveCanvasToDb } from 'apis/room.client.api';
import { useRoomState } from 'components/ImageEditor/imageEditor.context';
import useSocket from 'components/useSocket';
import React, { useState } from 'react';
import { drawBrushStroke, getImageString } from 'utils/canvas.utils';
import { mousePositionCanvas, touchPositionCanvas } from 'utils/mouse.utils';

export function useBrushTool(): React.HTMLProps<HTMLCanvasElement> {
  const [isPainting, setIsPainting] = useState(false);
  const [positions, setPositions] = useState<Vector2[]>([]);
  const [lastPosition, setLastPosition] = useState<Vector2>({ x: 0, y: 0 });
  const { color, canvasRef, _id,  } = useRoomState();
  const { sendBrushStroke } = useSocket();

  const onDown = (position: Vector2) => {
    console.log('brush down', position);
    setIsPainting(true);
    setPositions([position]);
    setLastPosition(position);
  };

  const onMove = (position: Vector2) => {
    if (!isPainting) return;
    if (distance(position, lastPosition) < 1) return;
    drawBrushStroke(canvasRef, { positions: [position, lastPosition], color });
    setLastPosition(position);
    setPositions([...positions, position]);
  };

  const onEnd = () => {
    if (!isPainting) return;
    setIsPainting(false);
    saveCanvasToDb(_id, getImageString(canvasRef));
    sendBrushStroke({
      color,
      positions,
      size: 3,
    });
  };

  return {
    style: {
      cursor: 'crosshair',
      touchAction: 'none',
    },
    onMouseDown: e => onDown(mousePositionCanvas(e)),
    onMouseMove: e => onMove(mousePositionCanvas(e)),
    onMouseUp: e => onEnd(),
    onMouseLeave: e => onEnd(),

    onTouchStart: e => onDown(touchPositionCanvas(e, canvasRef.current)),
    onTouchMove: e => onMove(touchPositionCanvas(e, canvasRef.current)),
    onTouchCancel: e => onEnd(),
    onTouchEnd: e => onEnd(),
    onClick: () => {},
  };
}
