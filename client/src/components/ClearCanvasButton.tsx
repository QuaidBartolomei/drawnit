import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { saveCanvasToDb } from 'apis/room.client.api';
import { sendClearCanvas } from 'apis/socket.client.api';
import { useRoomState } from 'contexts/room.context';
import { clearCanvas } from 'utils/canvas.utils';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
  })
);

const ClearCanvasButton = () => {
  const classes = useStyles();
  const room = useRoomState();
  return (
    <Button
      className={classes.container}
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
};

export default ClearCanvasButton;
