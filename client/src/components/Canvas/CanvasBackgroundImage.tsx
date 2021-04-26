import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useRoomState } from 'components/ImageEditor/imageEditor.context';
import { loadCanvasImage } from 'utils/canvas.utils';
import { getBackgroundImage } from 'apis/room.client.api';
import { SocketEvents } from 'apis/socket.client.api';

const useStyles = makeStyles(theme =>
  createStyles({
    canvas: {
      border: 'thin black solid',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
);

const CanvasBackgroundImage = () => {
  const classes = useStyles();
  const { canvasImage, _id, canvasRef, socket } = useRoomState();
  const [bgImgUrl, setBgImgUrl] = React.useState('');

  useEffect(() => {
    socket.on(SocketEvents.BackgroundImage, ()=>{})
  }, [socket]);

  useEffect(() => {
    getBackgroundImage(_id).then(imgUrl => imgUrl && setBgImgUrl(imgUrl));
  }, [_id]);

  useEffect(() => {
    if (!canvasImage) return;
    const img = new Image();
    img.src = JSON.parse(canvasImage);
    img.onload = e => {
      loadCanvasImage(canvasRef, img);
    };
  }, [canvasImage, canvasRef]);

  if (!bgImgUrl) return null;
  return <img className={classes.canvas} alt='background' src={bgImgUrl} />;
};

export default CanvasBackgroundImage;
