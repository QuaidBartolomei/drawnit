import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BrushIcon from '@material-ui/icons/Brush';
import PanToolIcon from '@material-ui/icons/PanTool';
import {
  useRoomDispatch,
  useRoomState,
} from 'components/ImageEditor/imageEditor.context';
import React from 'react';
import BrushColorInput from './BrushColorInput';
import { CanvasTools } from './Canvas';
import ChangeCanvasBackgroundButton from './ChangeCanvasBackgroundButton';
import ClearCanvasButton from './ClearCanvasButton';
import ShareButton from './ShareButton';

const useStyles = makeStyles(theme =>
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
      color={room.selectedTool === id ? 'secondary' : 'default'}
    >
      {icon}
    </IconButton>
  );

  return (
    <div className={classes.container}>
      <BrushColorInput />
      {canvasTools.map(CanvasToolButton)}
      <ShareButton />
      <ClearCanvasButton />
      <ChangeCanvasBackgroundButton />
    </div>
  );
};

export default CanvasToolbar;
