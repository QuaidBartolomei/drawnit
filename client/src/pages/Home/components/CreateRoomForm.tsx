import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createRoom, setImage } from 'apis/room.client.api';
import ImageInput from 'components/ImageInput';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

const useStyles = makeStyles(theme =>
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
    horizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const validationSchema = yup.object({
  image: yup.mixed().nullable().notRequired(),
  width: yup.number().min(0).max(1000).required('Width is required'),
  height: yup.number().min(0).max(1000).required('Height is required'),
});

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

  const [noBackground, setNoBackground] = useState(false);

  const formik = useFormik<Settings>({
    initialValues: {
      width: 400,
      height: 400,
      imageFile: undefined,
    },
    onSubmit: async values => {
      const room = await createRoom(values);
      const roomId = room?._id || 'error';
      if (!room) return;
      if (values.imageFile) {
        await setImage(roomId, values.imageFile);
      }
      onSubmit(roomId);
    },
  });

  function WidthInput() {
    return (
      <TextField
        id='width'
        label='Width'
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        value={formik.values.width}
        onChange={formik.handleChange}
        error={formik.values.imageFile && Boolean(formik.errors.width)}
        helperText={formik.touched.width && formik.errors.width}
      />
    );
  }

  function HeightInput() {
    return (
      <TextField
        id='height'
        label='height'
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        value={formik.values.height}
        onChange={formik.handleChange}
        error={formik.values.imageFile && Boolean(formik.errors.height)}
        helperText={formik.touched.height && formik.errors.height}
      />
    );
  }

  function NoImageButton() {
    return (
      <Button
        onClick={() => setNoBackground(true)}
      >
        Blank Background
      </Button>
    );
  }

  function SubmitButton() {
    return (
      <Button type='submit' variant='contained' color='primary'>
        Create Room
      </Button>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.container}>
        <ImageInput />
        <NoImageButton />
      {noBackground && !formik.values.imageFile ? (
        <React.Fragment>
          <WidthInput />
          <HeightInput />
        </React.Fragment>
      ) : null}
      {noBackground || formik.values.imageFile ? <SubmitButton /> : null}
    </form>
  );
};

export default CreateRoomForm;
