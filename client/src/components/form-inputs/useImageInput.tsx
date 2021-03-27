import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageUploadButton from 'components/ImageUploadButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
    containerHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export default function useImageInput() {
  const classes = useStyles();
  const [value, setValue] = useState<File>();

  const deleteIcon = value && (
    <IconButton aria-label='delete' onClick={() => setValue(value)}>
      <DeleteIcon />
    </IconButton>
  );
  const Component = () => (
    <React.Fragment>
      <div className={classes.containerHorizontal}>
        <ImageUploadButton onFileSelect={setValue} />
        {deleteIcon}
      </div>
      {value && <img src={URL.createObjectURL(value)} alt='uploaded file' />}
    </React.Fragment>
  );

  return {
    Component,
    value,
  };
}
