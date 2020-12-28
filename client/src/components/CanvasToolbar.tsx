import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BrushIcon from '@material-ui/icons/Brush';
import { saveCanvasToDb } from 'apis/room.api';
import { sendClearCanvas } from 'apis/socket.api';
import { useRoomDispatch, useRoomState } from 'contexts/room.context';
import React from 'react';
import { clearCanvas } from 'utils/canvas.utils';
import { CanvasTools } from './Canvas';
import PanToolIcon from '@material-ui/icons/PanTool';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: '100%',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

interface CanvasTool {
  id: CanvasTools;
  label: string;
  icon: JSX.Element;
}

const canvasTools: CanvasTool[] = [
  {
    id: CanvasTools.Brush,
    icon: <BrushIcon />,
    label: 'brush',
  },
  {
    id: CanvasTools.Pan,
    icon: <PanToolIcon />,
    label: 'pan',
  },
];

const CanvasToolbar = () => {
  const classes = useStyles();
  const roomDispatch = useRoomDispatch();
  const room = useRoomState();

  function setCanvasTool(tool: CanvasTools) {
    roomDispatch({
      type: 'set_canvasTool',
      payload: tool,
    });
  }

  const CanvasToolButton = ({ icon, label, id }: CanvasTool) => (
    <IconButton
      aria-label={label}
      onClick={() => setCanvasTool(id)}
      key={label}
    >
      {icon}
    </IconButton>
  );

  return (
    <div className={classes.container}>
      {canvasTools.map(CanvasToolButton)}
      <Button
        onClick={() => {
          clearCanvas(room.canvasRef);
          saveCanvasToDb(room._id, '');
          sendClearCanvas(room._id, room.socket);
        }}
      >
        Clear Canvas
      </Button>
    </div>
  );
};

export default CanvasToolbar;
