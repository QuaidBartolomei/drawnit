import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import copy from 'clipboard-copy';
import { useRoomState } from 'components/ImageEditor/imageEditor.context';
import React from 'react';
import { PageRoutes } from 'routes/page.routes';

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      justifyContent: 'center',
      borderRadius: 8,
      border: 'thin black solid',
      padding: theme.spacing(1),

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
    header: {},
    urlField: {
      width: 340,
    },
  })
);

export default function ShareButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { _id } = useRoomState();
  const url = window.location.origin + PageRoutes(_id).ROOM;

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const UrlPreview = () => (
    <Container className={classes.containerHorizontal}>
      <TextField className={classes.urlField} value={url} variant='outlined' />
      <IconButton aria-label='copy' onClick={() => copy(url)}>
        <FileCopyIcon />
      </IconButton>
    </Container>
  );

  return (
    <>
      <IconButton aria-label={'Share'} onClick={handleToggle}>
        <ShareIcon />
      </IconButton>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <div className={classes.container}>
          <Typography>
            Use this link to share the room and return to it later.
          </Typography>
          <UrlPreview />
        </div>
      </Backdrop>
    </>
  );
}
