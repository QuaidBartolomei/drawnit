import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { createRoom, setImage } from 'apis/room.client.api';
import useNumberInput from 'components/form-inputs/useNumberInput';
import React from 'react';
import useImageInput from 'components/form-inputs/useImageInput';
import RoomPreview from './RoomPreview';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ImageInput from 'components/form-inputs/ImageInput';
import Room from 'interfaces/room.interface';

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
  })
);

interface Settings {
  width?: number;
  height?: number;
  imageFile?: File;
}

const CreateRoomForm = ({
  onSubmit,
}: {
  onSubmit: (roomId: string) => void;
}) => {
  const classes = useStyles();
  const formik = useFormik<Settings>({
    initialValues: {
      width: 400,
      height: 400,
      imageFile: undefined,
    },
    onSubmit: async (values) => {
      const room = await createRoom(values);
      const roomId = room?._id || 'error';
      if (!room) return;
      if (values.imageFile) {
        await setImage(roomId, values.imageFile);
      }
      onSubmit(roomId);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.container}>
      <ImageInput />

      <Button type='submit' variant='contained' color='primary'>
        Create Room
      </Button>
    </form>
  );
};

export default CreateRoomForm;
