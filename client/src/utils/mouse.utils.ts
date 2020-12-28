import { subtract, Vector2 } from '@graph-ts/vector2';

const screenToCanvasPosition = (
  screenPosition: Vector2,
  canvasRef: HTMLCanvasElement | null
): Vector2 => {
  return subtract(screenPosition, canvasOffset(canvasRef));
};
const canvasOffset = (canvasRef: HTMLCanvasElement | null): Vector2 => {
  if (!canvasRef) return { x: 0, y: 0 };
  return { x: canvasRef.offsetLeft, y: canvasRef.getBoundingClientRect().top };
};

export const mousePositionScreen = (event: React.MouseEvent): Vector2 => ({
  x: event.pageX,
  y: event.pageY,
});
export const touchPositionScreen = (event: React.TouchEvent): Vector2 => ({
  x: event.touches[0].clientX,
  y: event.touches[0].clientY,
});

export const mousePositionCanvas = (event: React.MouseEvent) => ({
  x: event.nativeEvent.offsetX,
  y: event.nativeEvent.offsetY,
});

export function touchPositionCanvas(
  event: React.TouchEvent,
  canvasRef: HTMLCanvasElement | null
): Vector2 {
  const screenPos = touchPositionScreen(event);
  return screenToCanvasPosition(screenPos, canvasRef);
}
