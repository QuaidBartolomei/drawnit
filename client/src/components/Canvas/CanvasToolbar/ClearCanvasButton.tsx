import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useMemo } from 'react'
import { clearCanvas } from 'components/Canvas/canvas.utils'
import useSocket from 'components/Canvas/hooks/useSocket'
import { deleteBackgroundImage, saveCanvasToDb } from 'utils/roomApi'
import { sendClearCanvas } from 'utils/socket'

import { useRoomDispatch, useRoomState } from '../room.context'

const useStyles = makeStyles((theme) =>
  createStyles({
    child: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      '&>*': {
        margin: theme.spacing(1),
      },
    },
    containerHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    urlField: {
      width: 340,
    },
  }),
)

function ClearCanvasButton() {
  const { _id, canvasRef, socket } = useRoomState()

  const { updateBackgroundIMage } = useSocket()
  const classes = useStyles()
  const dispatch = useRoomDispatch()

  const hideBackdrop = () => {
    dispatch({ type: 'set_backdrop_content', payload: <div /> })
  }

  function onRemoveBackground() {
    deleteBackgroundImage({ id: _id })
    updateBackgroundIMage()
    hideBackdrop()
  }

  function onRemoveChanges() {
    clearCanvas(canvasRef)
    saveCanvasToDb(_id, '')
    sendClearCanvas(_id, socket)
    hideBackdrop()
  }

  const AlertDialog = useMemo(
    () => (
      <div className={classes.child}>
        <Button
          onClick={() => onRemoveBackground()}
          color="secondary"
          variant="contained"
        >
          Remove Background
        </Button>
        <Button
          onClick={() => onRemoveChanges()}
          color="secondary"
          variant="contained"
        >
          Clear Edits
        </Button>
      </div>
    ),
    [onRemoveBackground, classes, onRemoveChanges],
  )

  const handleClick = () => {
    dispatch({ type: 'set_backdrop_content', payload: AlertDialog })
  }

  return (
    <IconButton onClick={handleClick}>
      <DeleteForeverIcon />
    </IconButton>
  )
}

export default ClearCanvasButton
