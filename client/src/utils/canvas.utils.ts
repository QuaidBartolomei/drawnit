import { BrushStroke } from 'interfaces/brushStroke.interface'

type CanvasRef = React.RefObject<HTMLCanvasElement>

export function getCanvasContext(
  canvasRef: CanvasRef,
): CanvasRenderingContext2D | null {
  if (!canvasRef.current) return null
  return canvasRef.current.getContext('2d') as CanvasRenderingContext2D
}

export function drawBrushStroke(
  canvasRef: CanvasRef,
  brushStroke: Partial<BrushStroke>,
) {
  const positions = brushStroke.positions || []
  const color = brushStroke.color || 'red'
  const size = brushStroke.size || 3
  const canvasContext = getCanvasContext(canvasRef)
  if (!canvasContext) return
  canvasContext.lineJoin = 'round'
  if (positions.length < 1) return
  canvasContext.beginPath()
  canvasContext.moveTo(positions[0].x, positions[0].y)
  canvasContext.strokeStyle = color
  canvasContext.lineWidth = size
  for (const position of positions) {
    canvasContext.lineTo(position.x, position.y)
    canvasContext.moveTo(position.x, position.y)
  }
  canvasContext.closePath()
  canvasContext.stroke()
}

export function getImageString(ref: CanvasRef): string {
  if (!ref.current) return ''
  const image = ref.current.toDataURL()
  return JSON.stringify(image)
}

export function loadCanvasImage(ref: CanvasRef, image: HTMLImageElement) {
  console.log('loading canvas image')

  const canvasContext = getCanvasContext(ref)
  if (!canvasContext) return console.log('canvas context not found')
  canvasContext.drawImage(image, 0, 0)
}

export function setCanvasSize(ref: CanvasRef, width: number, height: number) {
  const canvas = ref.current
  if (!canvas) return
  canvas.width = Number(width)
  canvas.height = Number(height)
}

export function clearCanvas(ref: CanvasRef) {
  const canvasContext = getCanvasContext(ref)
  if (!canvasContext) return
  canvasContext.clearRect(
    0,
    0,
    canvasContext.canvas.width,
    canvasContext.canvas.height,
  )
}
