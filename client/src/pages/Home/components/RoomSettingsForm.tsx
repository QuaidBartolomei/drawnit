import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Room from 'interfaces/room.interface';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
  })
);

const RoomSettingsForm = () => {
  const classes = useStyles();
  const [room, setRoom] = useState<Partial<Room>>({
    width: 300,
    height: 300,
  });

  return (
    <div className={classes.container}>
      <TextField
        value={room.width}
        label='width'
        type='number'
        onChange={(e) => setRoom({ ...room, width: Number(e.target.value) })}
      />
    </div>
  );
};

export default RoomSettingsForm;
