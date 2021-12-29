import { ButtonBase } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { useRoomDispatch, useRoomState } from './Canvas/room.context'

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      height: '100vh',
      width: '100vw',
    },
    container: {
      zIndex: theme.zIndex.drawer + 2,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: 8,
      border: 'thin black solid',
      padding: theme.spacing(2),
      maxWidth: '100vw',
    },
  }),
)

export function BackdroppedAlert() {
  const { backdropContent } = useRoomState()
  const dispatch = useRoomDispatch()
  const classes = useStyles()

  const handleClose = () => {
    dispatch({ type: 'set_backdrop_content', payload: <div /> })
  }

  return (
    <Backdrop
      className={classes.backdrop}
      open={backdropContent != null}
      onClick={handleClose}
    >
      <ButtonBase
        className={classes.container}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {backdropContent}
      </ButtonBase>
    </Backdrop>
  )
}
