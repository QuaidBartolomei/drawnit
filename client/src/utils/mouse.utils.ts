import { Vector2 } from '@graph-ts/vector2';

export const mousePositionScreen = (event: React.MouseEvent): Vector2 => ({
  x: event.pageX,
  y: event.pageY,
});
export const touchPositionScreen = (event: React.TouchEvent): Vector2 => ({
  x: event.touches[0].pageX,
  y: event.touches[0].pageY,
});

export const mousePositionCanvas = (event: React.MouseEvent) => ({
  x: event.nativeEvent.offsetX,
  y: event.nativeEvent.offsetY,
});

