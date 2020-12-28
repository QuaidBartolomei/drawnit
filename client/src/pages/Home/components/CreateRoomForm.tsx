import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ImageUploadButton from 'components/ImageUploadButton';
import Room from 'interfaces/room.interface';
import React from 'react';

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

interface Props {
  onSubmit: (roomSettings: Partial<Room>, backgroundImageFile?: File) => void;
}

const CreateRoomForm = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const [backgroundImageFile, setBackgroundImageFile] = React.useState<
    File | undefined
  >(undefined);

  React.useEffect(() => {
    if (!backgroundImageFile) return;
    let img = new Image();
    img.src = URL.createObjectURL(backgroundImageFile);
    img.onload = () => {
      // setCanvasSize({
      //   width: img.width,
      //   height: img.height,
      // });
    };
  }, [backgroundImageFile]);

  const imagePreview = backgroundImageFile ? (
    <img src={URL.createObjectURL(backgroundImageFile)} alt='uploaded file' />
  ) : null;

  return (
    <div className={classes.container}>
      <Typography>Draw on an image</Typography>
      <ImageUploadButton onFileSelect={setBackgroundImageFile} />
      {imagePreview}
      <Typography>Create an empty canvas</Typography>
      <Button
        onClick={() => onSubmit({}, backgroundImageFile)}
        variant='contained'
        color='primary'
      >
        Create Room
      </Button>
    </div>
  );
};

export default CreateRoomForm;
