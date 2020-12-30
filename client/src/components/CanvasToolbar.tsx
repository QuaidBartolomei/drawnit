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
import { SketchPicker } from 'react-color';
import BrushColorInput from './BrushColorInput';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      '&>*': {
        margin: '0.5rem',
      },
      borderRadius: 8,
      border: 'thin black solid',
    },
    colorPicker: {
      backgroundColor: 'red',
      width: 32,
      height: 32,
      cursor: 'pointer',
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

  const ClearCanvasButton = () => (
    <Button
      onClick={() => {
        clearCanvas(room.canvasRef);
        saveCanvasToDb(room._id, '');
        sendClearCanvas(room._id, room.socket);
      }}
      variant='outlined'
    >
      Clear Canvas
    </Button>
  );


  return (
    <div className={classes.container}>
      <BrushColorInput />
      {canvasTools.map(CanvasToolButton)}

      <ClearCanvasButton />
    </div>
  );
};

export default CanvasToolbar;
