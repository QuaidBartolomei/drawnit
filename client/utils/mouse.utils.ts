import { Vector2 } from "@graph-ts/vector2";
import { canvasMargin } from "components/Canvas/Canvas";

export const mousePositionScreen = (event: React.MouseEvent): Vector2 => ({
  x: event.pageX,
  y: event.pageY,
});

export const mousePositionCanvas = (event: React.MouseEvent) => ({
  x: event.nativeEvent.offsetX,
  y: event.nativeEvent.offsetY,
});

export function touchPositionCanvas(event: React.TouchEvent): Vector2 {
  const { x: scrollLeft, y: scrollTop } = scrollOffset();
  const { pageX, pageY } = event.targetTouches[0];
  return {
    x: pageX - canvasMargin + scrollLeft,
    y: pageY - canvasMargin + scrollTop,
  };
}

export function scrollOffset() {
  const root = document.getElementById("root");
  if (!root) return { x: 0, y: 0 };
  const { scrollLeft, scrollTop } = root;
  return { x: scrollLeft, y: scrollTop };
}
