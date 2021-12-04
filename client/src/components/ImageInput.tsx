import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ImageUploadButton from 'components/ImageUploadButton'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    containerHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)

export default function ImageInput() {
  const classes = useStyles()
  const [value, setValue] = useState<File>()
  const deleteIcon = value && (
    <IconButton aria-label="delete" onClick={() => setValue(value)}>
      <DeleteIcon />
    </IconButton>
  )
  return (
    <React.Fragment>
      <div className={classes.containerHorizontal}>
        <ImageUploadButton onFileSelect={setValue} />
        {deleteIcon}
      </div>
      {value && <img src={URL.createObjectURL(value)} alt="uploaded file" />}
    </React.Fragment>
  )
}
