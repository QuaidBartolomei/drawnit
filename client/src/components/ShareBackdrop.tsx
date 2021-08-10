import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'clipboard-copy';
import {
  useRoomDispatch,
  useRoomState,
} from 'components/ImageEditor/imageEditor.context';
import React from 'react';
import { PageRoutes } from 'routes/page.routes';

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      right: 'auto',
      bottom: 'auto',
      height: '100vh',
      width: '100vw',
    },

    container: {
      zIndex: theme.zIndex.drawer + 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      justifyContent: 'center',
      borderRadius: 8,
      border: 'thin black solid',
      padding: theme.spacing(1),
      maxWidth: '100vw',
      '&>*': {
        margin: '0.5rem',
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
  })
);

export type ShareBackdropProps = {
  // props
};

export function ShareBackdrop() {
  const { _id, showBackdrop } = useRoomState();
  const dispatch = useRoomDispatch();
  const url = window.location.origin + PageRoutes(_id).ROOM;
  const classes = useStyles();

  const UrlPreview = () => (
    <Container className={classes.containerHorizontal}>
      <TextField className={classes.urlField} value={url} variant='outlined' />
      <IconButton aria-label='copy' onClick={() => copy(url)}>
        <FileCopyIcon />
      </IconButton>
    </Container>
  );

  const handleClose = () => {
    dispatch({ type: 'show_backdrop', payload: false });
  };

  return (
    <Backdrop
      className={classes.backdrop}
      open={showBackdrop}
      onClick={handleClose}
    >
      <div
        className={classes.container}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Typography>
          Use this link to share the room and return to it later.
        </Typography>
        <UrlPreview />
      </div>
    </Backdrop>
  );
}
