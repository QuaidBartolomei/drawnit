import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRoomState } from 'contexts/room.context';
import { useBrushTool } from 'hooks/brushTool';
import { BrushStroke } from 'interfaces/brushStroke.interface';
import React, { useEffect } from 'react';
import {
  clearCanvas,
  drawBrushStroke,
  loadCanvasImage,
} from 'utils/canvas.utils';
import { getBackgroundImage } from 'apis/room.api';
import { SocketEvents } from 'apis/socket.api';

export enum CanvasTools {
  Brush,
}

const useStyles = makeStyles((theme) => {
  const fullSize = {
    width: '100%',
    height: '100%',
  };
  return createStyles({
    outsideWrapper: (props) => ({
      ...props,
    }),
    insideWrapper: {
      ...fullSize,
      position: 'relative',
    },
    coveredImage: {
      ...fullSize,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
});

type Props = React.HTMLProps<HTMLCanvasElement>;
type Ref = React.ForwardedRef<HTMLCanvasElement>;

const Canvas = (props: Props, ref: Ref) => {
  const room = useRoomState();
  const size = { width: room.width, height: room.height };
  const classes = useStyles(size);
  const [imgUrl, setImgUrl] = React.useState('');
  const canvasTools = {
    [CanvasTools.Brush]: useBrushTool(),
  };

  // Load background image
  useEffect(() => {
    getBackgroundImage(room._id).then(
      (blob) => blob && setImgUrl(URL.createObjectURL(blob))
    );
  }, [room._id]);

  useEffect(() => {
    if (!room.canvasImage) return;
    let img = new Image();
    img.src = JSON.parse(room.canvasImage);
    img.onload = (e) => {
      loadCanvasImage(room.canvasRef, img);
    };
  }, [room.canvasImage, room.canvasRef]);

  useEffect(() => {
    room.socket
      .on(SocketEvents.BrushStroke, (brushStrokeString: string) => {
        const brushStroke: BrushStroke = JSON.parse(brushStrokeString);
        drawBrushStroke(room.canvasRef, brushStroke);
      })
      .on(SocketEvents.ClearCanvas, () => {
        clearCanvas(room.canvasRef);
      });
    return () => {
      room.socket.off(SocketEvents.BrushStroke);
      room.socket.off(SocketEvents.ClearCanvas);
    };
  }, [room.socket, room.canvasRef]);

  return (
    <div className={classes.outsideWrapper}>
      <div className={classes.insideWrapper}>
        <img className={classes.coveredImage} alt='background' src={imgUrl} />
        <canvas
          className={classes.coveredImage}
          {...props}
          {...size}
          {...canvasTools[room.selectedTool]}
          ref={ref}
        ></canvas>
      </div>
    </div>
  );
};

export default React.forwardRef<HTMLCanvasElement, Props>(Canvas);
