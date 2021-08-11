import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { createRoom } from 'apis/room.client.api';
import { Settings } from 'config';
import React from 'react';
import { useHistory } from 'react-router';
import { PageRoutes } from 'routes/page.routes';

const useStyles = makeStyles(theme =>
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
    bordered: {
      border: 'medium solid black',
      padding: '1rem',
    },
  })
);

const Homepage = () => {
  const classes = useStyles();
  const history = useHistory();

  async function goToNewRoom() {
    const room = await createRoom({
      width: 800,
      height: 800,
    });
    const roomId = room?._id || 'error';
    if (!room) return;
    history.push(PageRoutes(roomId).ROOM);
  }

  React.useEffect(() => {
    createRoom({
      width: 800,
      height: 800,
    }).then(room => {
      const roomId = room?._id || 'error';
      if (!room) return;
      history.push(PageRoutes(roomId).ROOM);
    });
  }, [history]);

  function CreateRoomButton() {
    return (
      <Button onClick={goToNewRoom} variant='contained' color='primary'>
        Create Room
      </Button>
    );
  }

  return (
    <div className={classes.container}>
      <Typography component='h1' variant='h3'>
        {Settings.PAGE_NAME}
      </Typography>
      <Typography component='h2' variant='subtitle1'>
        {Settings.SUBTITLE}
      </Typography>
      <CreateRoomButton />
    </div>
  );
};

export default Homepage;
