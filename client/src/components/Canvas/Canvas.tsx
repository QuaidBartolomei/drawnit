import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  CANVAS_MARGIN,
  CanvasToolTypes,
  clearCanvas,
} from 'components/Canvas/canvas.utils'
import { BrushStroke } from 'interfaces/brushStroke.interface'
import { forwardRef, useEffect } from 'react'
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

type Props = React.HTMLProps<HTMLCanvasElement>
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

  const canvasTools = {
    [CanvasToolTypes.Brush]: useBrushTool(),
    [CanvasToolTypes.Pan]: usePanTool(),
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

  return (
    <div className={classes.outsideWrapper}>
      <div className={classes.insideWrapper}>
        <CanvasBackgroundImage />
        <canvas
          className={classes.canvas}
          {...{ height, width }}
          {...props}
          {...canvasTools[selectedTool]}
          ref={ref}
        />
      </div>
    </div>
  )
}

export default forwardRef<HTMLCanvasElement, Props>(Canvas)
