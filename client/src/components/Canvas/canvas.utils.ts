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
  const { color = 'red', size = 3, positions = [] } = brushStroke
  const canvasContext = getCanvasContext(canvasRef)
  if (!canvasContext) return
  canvasContext.lineJoin = 'round'
  if (positions.length < 1) return
  canvasContext.beginPath()
  canvasContext.moveTo(positions[0].x, positions[0].y)
  canvasContext.strokeStyle = color
  canvasContext.lineWidth = size
  positions.forEach(({ x, y }) => {
    canvasContext.lineTo(x, y)
    canvasContext.moveTo(x, y)
  })
  canvasContext.closePath()
  canvasContext.stroke()
}

export function getImageString(ref: CanvasRef): string {
  if (!ref.current) return ''
  const image = ref.current.toDataURL()
  return JSON.stringify(image)
}

export function loadCanvasImage(ref: CanvasRef, image: HTMLImageElement) {
  const canvasContext = getCanvasContext(ref)
  if (!canvasContext) return console.error('canvas context not found')
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
