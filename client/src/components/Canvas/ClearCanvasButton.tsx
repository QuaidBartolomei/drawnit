import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { saveCanvasToDb } from 'apis/room.client.api';
import { sendClearCanvas } from 'apis/socket.client.api';
import { useRoomState } from 'components/ImageEditor/imageEditor.context';
import React from 'react';
import { clearCanvas } from 'utils/canvas.utils';

const ClearCanvasButton = () => {
  const room = useRoomState();
  return (
    <IconButton
      onClick={() => {
        clearCanvas(room.canvasRef);
        saveCanvasToDb(room._id, '');
        sendClearCanvas(room._id, room.socket);
      }}
    >
      <DeleteForeverIcon />
    </IconButton>
  );
};

export default ClearCanvasButton;
