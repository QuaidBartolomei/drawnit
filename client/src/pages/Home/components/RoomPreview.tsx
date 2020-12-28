import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { PageRoutes } from 'routes/page.routes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*': {
        margin: '1rem',
      },
    },
    header: {
      marginBottom: 16,
    },
    urlField: {
      width: 300,
    },
  })
);

const RoomPreview = ({ roomId }: { roomId?: string }) => {
  const classes = useStyles();
  const history = useHistory();

  if (!roomId) return null;
  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='h4'>
        Room Created !
      </Typography>
      <TextField
        className={classes.urlField}
        value={window.location.origin + PageRoutes(roomId).ROOM}
      />
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
