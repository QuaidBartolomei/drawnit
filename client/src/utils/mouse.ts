import { Vector2 } from '@graph-ts/vector2'
import { CANVAS_MARGIN } from 'components/Canvas/canvas.utils'

export function scrollOffset() {
  const root = document.getElementById('root')
  if (!root) return { x: 0, y: 0 }
  const { scrollLeft, scrollTop } = root
  return { x: scrollLeft, y: scrollTop }
}
export const mousePositionScreen = (event: React.MouseEvent): Vector2 => ({
  x: event.pageX,
  y: event.pageY,
})

export const mousePositionCanvas = (event: React.MouseEvent) => ({
  x: event.nativeEvent.offsetX,
  y: event.nativeEvent.offsetY,
})

export function touchPositionCanvas(event: React.TouchEvent): Vector2 {
  const { x: scrollLeft, y: scrollTop } = scrollOffset()
  const { pageX, pageY } = event.targetTouches[0]
  return {
    x: pageX - CANVAS_MARGIN + scrollLeft,
    y: pageY - CANVAS_MARGIN + scrollTop,
  }
}
