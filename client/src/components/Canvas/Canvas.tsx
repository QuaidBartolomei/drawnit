import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { SocketEvents } from 'apis/socket.client.api';
import { useBrushTool } from 'components/Canvas/hooks/brushTool.hook';
import { usePanTool } from 'components/Canvas/hooks/panTool.hook';
import { useRoomState } from 'components/ImageEditor/imageEditor.context';
import { BrushStroke } from 'interfaces/brushStroke.interface';
import React, { useEffect } from 'react';
import {
  clearCanvas,
  drawBrushStroke
} from 'utils/canvas.utils';
import CanvasBackgroundImage from './CanvasBackgroundImage';

export enum CanvasTools {
  Brush,
  Pan,
}

const useStyles = makeStyles((theme) => {
  const fullSize = {
    width: '100%',
    height: '100%',
  };
  const topLeft: CSSProperties = {
    ...fullSize,
    position: 'absolute',
    top: 0,
    left: 0,
  };
  return createStyles({
    outsideWrapper: (props) => ({
      ...props,
    }),
    insideWrapper: {
      ...fullSize,
      position: 'relative',
    },
    canvas: {
      ...topLeft,
      border: 'thin black solid',
    },
  });
});

type Props = React.HTMLProps<HTMLCanvasElement>;
type Ref = React.ForwardedRef<HTMLCanvasElement>;

const Canvas = (props: Props, ref: Ref) => {
  const {
    socket,
    canvasRef,
    backgroundImageId,
    selectedTool,
    width,
    height,
  } = useRoomState();
  const size = { width, height };
  const classes = useStyles(size);
  const canvasTools = {
    [CanvasTools.Brush]: useBrushTool(),
    [CanvasTools.Pan]: usePanTool(),
  };

  useEffect(() => {
    socket
      .on(SocketEvents.BrushStroke, (brushStrokeString: string) => {
        const brushStroke: BrushStroke = JSON.parse(brushStrokeString);
        drawBrushStroke(canvasRef, brushStroke);
      })
      .on(SocketEvents.ClearCanvas, () => {
        clearCanvas(canvasRef);
      });
    return () => {
      socket.off(SocketEvents.BrushStroke);
      socket.off(SocketEvents.ClearCanvas);
    };
  }, [socket, canvasRef]);

  return (
    <div className={classes.outsideWrapper}>
      <div className={classes.insideWrapper}>
        <CanvasBackgroundImage />
        <canvas
          className={classes.canvas}
          {...props}
          {...size}
          {...canvasTools[selectedTool]}
          ref={ref}
          style={{
            backgroundColor: backgroundImageId ? 'transparent' : 'white',
          }}
        ></canvas>
      </div>
    </div>
  );
};

export default React.forwardRef<HTMLCanvasElement, Props>(Canvas);
