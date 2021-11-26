import {
  createMuiTheme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import { SocketEvents } from 'utils/apis/socket.client.api'
import { useBrushTool } from 'components/Canvas/hooks/brushTool.hook'
import { usePanTool } from 'components/Canvas/hooks/panTool.hook'
import { BrushStroke } from 'interfaces/brushStroke.interface'
import React, { useEffect } from 'react'
import { clearCanvas, drawBrushStroke } from 'utils/canvas.utils'
import CanvasBackgroundImage from './CanvasBackgroundImage'
import { useRoomState } from './room.context'

export enum CanvasTools {
  Brush,
  Pan,
}

export const canvasMargin = createMuiTheme({}).spacing(16)

const useStyles = makeStyles((theme) => {
  return createStyles({
    outsideWrapper: ({ width, height }) => ({
      display: 'inline-block',
      height,
      width,
      margin: canvasMargin,
    }),
    insideWrapper: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    canvas: (size: {
      width: number
      height: number
      backgroundColor: string
    }) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      ...size,
      border: 'thin black solid',
    }),
  })
})

type Props = React.HTMLProps<HTMLCanvasElement>
type Ref = React.ForwardedRef<HTMLCanvasElement>

const Canvas = (props: Props, ref: Ref) => {
  const { socket, canvasRef, backgroundImageId, selectedTool, width, height } =
    useRoomState()

  const classes = useStyles({
    width,
    height,
    backgroundColor: backgroundImageId ? 'transparent' : 'white',
  })

  const canvasTools = {
    [CanvasTools.Brush]: useBrushTool(),
    [CanvasTools.Pan]: usePanTool(),
  }

  useEffect(() => {
    socket
      .on(SocketEvents.BrushStroke, (brushStrokeString: string) => {
        const brushStroke: BrushStroke = JSON.parse(brushStrokeString)
        drawBrushStroke(canvasRef, brushStroke)
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
        ></canvas>
      </div>
    </div>
  )
}

export default React.forwardRef<HTMLCanvasElement, Props>(Canvas)