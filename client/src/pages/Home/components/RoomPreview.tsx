import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { PageRoutes } from 'routes/page.routes';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'clipboard-copy';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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

const RoomPreview = ({ roomId }: { roomId?: string }) => {
  const classes = useStyles();
  const history = useHistory();

  const url = window.location.origin + PageRoutes(roomId).ROOM;

  const UrlPreview = () => (
    <Container className={classes.containerHorizontal}>
      <TextField className={classes.urlField} value={url} variant='outlined' />
      <IconButton aria-label='copy' onClick={() => copy(url)}>
        <FileCopyIcon />
      </IconButton>
    </Container>
  );

  if (!roomId) return null;
  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='h4'>
        Room Created !
      </Typography>
      <Typography>
        Use this link to share the room and return to it later.
      </Typography>
      <UrlPreview />
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          history.push(PageRoutes(roomId).ROOM);
        }}
      >
        Go To Room
      </Button>
    </div>
  );
};

export default RoomPreview;
