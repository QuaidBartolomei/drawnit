import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageUploadButton from 'components/ImageUploadButton';
import Room from 'interfaces/room.interface';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*': {
        margin: '.5rem',
      },
    },
    containerHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
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

  const [room, setRoom] = useState<Partial<Room>>({
    width: 300,
    height: 300,
  });

  React.useEffect(() => {
    if (!backgroundImageFile) return;
    let img = new Image();
    img.src = URL.createObjectURL(backgroundImageFile);
    img.onload = () => {
      setRoom((room) => ({ ...room, width: img.width, height: img.height }));
    };
  }, [backgroundImageFile]);

  const RoomSettings = ({
    onChange,
  }: {
    onChange: (roomSettings: Partial<Room>) => void;
  }) => (
    <div className={classes.container}>
      <TextField
        value={room.width}
        label='Width'
        type='number'
        onChange={(e) => onChange({ width: Number(e.target.value) })}
        disabled={Boolean(backgroundImageFile)}
      />
      <TextField
        value={room.height}
        label='Height'
        type='number'
        onChange={(e) => onChange({ height: Number(e.target.value) })}
        disabled={Boolean(backgroundImageFile)}
      />
    </div>
  );

  const imagePreview = backgroundImageFile ? (
    <img src={URL.createObjectURL(backgroundImageFile)} alt='uploaded file' />
  ) : null;

  const deleteIcon = backgroundImageFile && (
    <IconButton
      aria-label='delete'
      onClick={() => setBackgroundImageFile(undefined)}
    >
      <DeleteIcon />
    </IconButton>
  );

  return (
    <div className={classes.container}>
      <div className={classes.containerHorizontal}>
        <ImageUploadButton onFileSelect={setBackgroundImageFile} />
        {deleteIcon}
      </div>
      {imagePreview}
      <RoomSettings
        onChange={(settings) => setRoom((room) => ({ ...room, ...settings }))}
      />
      <Button
        onClick={() => onSubmit(room, backgroundImageFile)}
        variant='contained'
        color='primary'
      >
        Create Room
      </Button>
    </div>
  );
};

export default CreateRoomForm;
