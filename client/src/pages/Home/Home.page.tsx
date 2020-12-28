import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ImageUploadButton from 'components/ImageUploadButton';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageRoutes } from 'routes/page.routes';
import { createRoom, setImage } from 'apis/room.api';
import RoomsList from 'components/RoomsList';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*': {
        margin: 8,
      },
    },
  })
);

const Homepage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [canvasSize, setCanvasSize] = React.useState({
    width: 300,
    height: 300,
  });
  const [backgroundImageFile, setBackgroundImageFile] = React.useState<
    File | undefined
  >(undefined);

  React.useEffect(() => {
    if (!backgroundImageFile) return;
    let img = new Image();
    img.src = URL.createObjectURL(backgroundImageFile);
    img.onload = () => {
      setCanvasSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [backgroundImageFile]);

  async function handleCreateRoomButton() {
    const room = await createRoom(canvasSize);
    const roomId = room?._id || 'error';
    if (!room) return;
    if (backgroundImageFile) {
      await setImage(roomId, backgroundImageFile);
    }
    history.push(PageRoutes(roomId).ROOM);
  }

  return (
    <div className={classes.container}>
      <ImageUploadButton onFileSelect={setBackgroundImageFile} />
      {backgroundImageFile ? (
        <img
          src={URL.createObjectURL(backgroundImageFile)}
          alt='uploaded file'
        />
      ) : null}
      <Button
        onClick={handleCreateRoomButton}
        variant='contained'
        color='primary'
      >
        Create Room
      </Button>
      <RoomsList />
    </div>
  );
};

export default Homepage;
