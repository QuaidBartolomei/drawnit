import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*': {
        margin: '.5rem',
      },
    },
    fileButton: {
      backgroundColor: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    fileInput: {
      width: 0.1,
      height: 0.1,
      opacity: 0,
      overflow: 'hidden',
      position: 'absolute',
      zIndex: -1,
    },
  })
);

type Props = {
  onFileSelect: (file: File) => void;
};

const ImageUploadButton = ({ onFileSelect }: Props) => {
  const classes = useStyles();
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget) return;
    const files = e.currentTarget.files;
    if (!files) return;
    if (!files.length) return;
    const file = files[0];
    onFileSelect(file);
  };

  return (
    <div className={classes.root}>
      <input
        accept='image/*'
        className={classes.fileInput}
        id='image-file-input'
        type='file'
        name='file'
        onChange={handleImageUpload}
      />
      <label htmlFor='image-file-input'>
        <Button variant='contained' color='default' component='span'>
          Select Image
        </Button>
      </label>
    </div>
  );
};

export default ImageUploadButton;
