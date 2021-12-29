import Button from '@material-ui/core/Button'
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

function ImageUploadButton({ onFileSelect }: Props) {
  const classes = useStyles()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget) return
    const { files } = e.currentTarget
    if (!files || !files.length) return
    const file = files[0]
    onFileSelect(file)
  }

  const domId = 'image-file-input'

  return (
    <div className={classes.root}>
      <label htmlFor={domId}>
        <Button
          style={{
            width: 16,
          }}
          color="default"
          component="span"
        >
          <ImageIcon />
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.fileInput}
        id={domId}
        type="file"
        name="file"
        onChange={handleImageUpload}
      />
    </div>
  )
}

export default ImageUploadButton
