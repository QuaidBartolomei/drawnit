import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CreateRoomForm from './components/CreateRoomForm';
import RoomPreview from './components/RoomPreview';
import Title from './components/Title';

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
    bordered: {
      border: 'medium solid black',
      padding: '1rem',
    },
  })
);

const Homepage = () => {
  const classes = useStyles();
  const [roomId, setRoomId] = React.useState('');

  return (
    <div className={classes.container}>
      <Title />
      <div className={classes.bordered}>
        {roomId ? (
          <RoomPreview roomId={roomId} />
        ) : (
          <CreateRoomForm onSubmit={setRoomId} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
