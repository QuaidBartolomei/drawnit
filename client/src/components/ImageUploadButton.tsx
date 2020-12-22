import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) =>
  createStyles({
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
    <label className={classes.fileButton}>
      <input
        className={classes.fileInput}
        id='image-file-input'
        type='file'
        name='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
      <ImageIcon /> Upload Image
    </label>
  );
};

export default ImageUploadButton;
