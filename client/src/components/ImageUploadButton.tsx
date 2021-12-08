import Button, { ButtonProps } from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ImageIcon from '@material-ui/icons/Image'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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
  }),
)

type Props = {
  onFileSelect: (file: File) => void
}

const ImageUploadButton = ({ onFileSelect, ...props }: ButtonProps & Props) => {
  const classes = useStyles()

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget) return
    const files = e.currentTarget.files
    if (!files || !files.length) return
    const file = files[0]
    onFileSelect(file)
  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.fileInput}
        id="image-file-input"
        type="file"
        name="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="image-file-input">
        <Button
          style={{
            width: 16,
          }}
          color="default"
          component="span"
          {...props}
        >
          <ImageIcon />
        </Button>
      </label>
    </div>
  )
}

export default ImageUploadButton
