import IconButton from '@material-ui/core/IconButton';
import {
  useRoomDispatch,
  useRoomState
} from 'components/ImageEditor/imageEditor.context';
import React from 'react';
import { CanvasTools } from '../Canvas';
import { CanvasTool } from './CanvasToolbar';

export type CanvasToolButtonProps = {
  // props
} & CanvasTool;

export default function CanvasToolButton(props: CanvasToolButtonProps) {
  const { label, id, icon } = props;
  const roomDispatch = useRoomDispatch();
  const room = useRoomState();

  function setCanvasTool(tool: CanvasTools) {
    roomDispatch({
      type: 'set_canvasTool',
      payload: tool,
    });
  }

  return (
    <IconButton
      aria-label={label}
      onClick={() => setCanvasTool(id)}
      key={label}
      color={room.selectedTool === id ? 'secondary' : 'default'}

    >
      {icon}
    </IconButton>
  );
}
