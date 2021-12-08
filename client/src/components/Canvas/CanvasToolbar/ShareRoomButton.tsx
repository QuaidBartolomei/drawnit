import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ShareIcon from '@material-ui/icons/Share'
import copy from 'clipboard-copy'
import { PageRoutes } from 'routes'

import { useRoomDispatch, useRoomState } from '../room.context'

const useStyles = makeStyles(() =>
  createStyles({
    child: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
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

export default function ShareRoomButton() {
  const dispatch = useRoomDispatch()
  const classes = useStyles()
  const { _id } = useRoomState()
  const url = window.location.origin + PageRoutes(_id).ROOM

  const UrlPreview = () => (
    <Container className={classes.containerHorizontal}>
      <TextField className={classes.urlField} value={url} variant="outlined" />
      <IconButton aria-label="copy" onClick={() => copy(url)}>
        <FileCopyIcon />
      </IconButton>
    </Container>
  )

  const Children = () => (
    <div className={classes.child}>
      <Typography>
        Use this link to share the room and return to it later.
      </Typography>
      <UrlPreview />
    </div>
  )

  const handleToggle = () => {
    dispatch({ type: 'set_backdrop_content', payload: <Children /> })
  }

  return (
    <IconButton aria-label={'Share'} onClick={handleToggle}>
      <ShareIcon />
    </IconButton>
  )
}
