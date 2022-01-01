import { createStyles, makeStyles } from '@material-ui/core/styles'
import { forwardRef, useEffect } from 'react'
import {
  CANVAS_MARGIN,
  CanvasToolType,
  clearCanvas,
} from 'components/Canvas/canvas.utils'
import { BrushStroke } from 'interfaces/brushStroke.interface'
import { SocketEvents } from 'utils/socket'

import CanvasBackgroundImage from './CanvasBackgroundImage'
import { useBrushTool } from './hooks/useBrushTool'
import { usePanTool } from './hooks/usePanTool'
import { useRoomDispatch, useRoomState } from './room.context'

const useStyles = makeStyles(() =>
  createStyles({
    outsideWrapper: ({ width, height }) => ({
      display: 'inline-block',
      height,
      width,
      margin: CANVAS_MARGIN,
    }),
    insideWrapper: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    canvas: (settings: {
      width: number
      height: number
      backgroundColor: string
    }) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      ...settings,
      border: 'thin black solid',
    }),
  }),
)

type Props = unknown
type Ref = React.ForwardedRef<HTMLCanvasElement>

function Canvas(props: Props, ref: Ref) {
  const { socket, canvasRef, backgroundImageId, selectedTool, width, height } =
    useRoomState()
  const roomDispatch = useRoomDispatch()

  const classes = useStyles({
    width,
    height,
    backgroundColor: backgroundImageId ? 'transparent' : 'white',
  })

  const canvasTools: {
    [Property in CanvasToolType]: React.HTMLProps<HTMLCanvasElement>
  } = {
    brush: useBrushTool(),
    pan: usePanTool(),
  }

  useEffect(() => {
    socket
      .on(SocketEvents.BrushStroke, (brushStrokeString: string) => {
        const brushStroke: BrushStroke = JSON.parse(brushStrokeString)
        roomDispatch({ type: 'draw_brush_stroke', payload: brushStroke })
      })
      .on(SocketEvents.ClearCanvas, () => {
        clearCanvas(canvasRef)
      })
    return () => {
      socket.off(SocketEvents.BrushStroke)
      socket.off(SocketEvents.ClearCanvas)
    }
  }, [socket, canvasRef])

  const {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onTouchCancel,
    onTouchEnd,
    onClick,
  } = canvasTools[selectedTool]

  return (
    <div className={classes.outsideWrapper}>
      <div className={classes.insideWrapper}>
        <CanvasBackgroundImage />
        <canvas
          className={classes.canvas}
          {...{
            height,
            width,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave,
            onTouchStart,
            onTouchMove,
            onTouchCancel,
            onTouchEnd,
            onClick,
          }}
          ref={ref}
        />
      </div>
    </div>
  )
}

export default forwardRef<HTMLCanvasElement, Props>(Canvas)
