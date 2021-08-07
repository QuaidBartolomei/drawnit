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
import CanvasToolButton from './CanvasToolButton';
import ChangeCanvasBackgroundButton from './ChangeCanvasBackgroundButton';
import ClearCanvasButton from './ClearCanvasButton';
import ShareButton from './ShareButton';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
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

export type CanvasTool = {
  id: CanvasTools;
  label: string;
  icon: JSX.Element;
};

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

export default function CanvasToolbar() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <BrushColorInput
      
      />
      {canvasTools.map(CanvasToolButton)}
      <ShareButton />
      <ClearCanvasButton />
      <ChangeCanvasBackgroundButton />
    </div>
  );
}
