import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { saveCanvasToDb } from 'apis/room.client.api';
import { sendClearCanvas } from 'apis/socket.client.api';
import {
  useRoomDispatch,
  useRoomState,
} from 'components/ImageEditor/imageEditor.context';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { clearCanvas } from 'utils/canvas.utils';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>
  createStyles({
    child: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    containerHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    urlField: {
      width: 340,
    },
  })
);

const ClearCanvasButton = () => {
  const room = useRoomState();
  const classes = useStyles();
  const dispatch = useRoomDispatch();

  function onRemoveBackground() {}

  function onRemoveChanges() {
    clearCanvas(room.canvasRef);
    saveCanvasToDb(room._id, '');
    sendClearCanvas(room._id, room.socket);
    hideBackdrop();
  }

  const Children = () => (
    <div className={classes.child}>
      <Button
        onClick={onRemoveBackground}
        color='secondary'
        variant='contained'
      >
        Remove Background
      </Button>
    </div>
  );

  const hideBackdrop = () => {
    dispatch({ type: 'set_backdrop_content', payload: null });
  };

  const handleClick = () => {
    dispatch({ type: 'set_backdrop_content', payload: <Children /> });
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

export default ClearCanvasButton;
