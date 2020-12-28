import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PageRoutes } from 'routes/page.routes';
import Room from 'interfaces/room.interface';
import { getAllRooms } from 'apis/room.api';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

const RoomsList = () => {
  const classes = useStyles();
  const [rooms, setRooms] = React.useState<Room[]>();
  React.useEffect(() => {
    getAllRooms().then(setRooms);
  }, []);
  return (
    <div className={classes.container}>
      {rooms &&
        rooms.map(({ _id }) => (
          <a key={_id} href={PageRoutes(_id).ROOM}>
            {_id}
          </a>
        ))}
    </div>
  );
};

export default RoomsList;
