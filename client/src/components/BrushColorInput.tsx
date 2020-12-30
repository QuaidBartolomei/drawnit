import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';
import { useRoomDispatch, useRoomState } from 'contexts/room.context';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
    color: {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
    },
    swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: 2,
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  })
);

const BrushColorInput = () => {
  const classes = useStyles();
  const { color } = useRoomState();
  const dispatch = useRoomDispatch();
  const setColor = (c: string) => dispatch({ type: 'set_color', payload: c });
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const swatch = (
    <div
      className={classes.swatch}
      onClick={() => setShowColorPicker(!showColorPicker)}
    >
      <div
        className={classes.color}
        style={{
          background: color,
        }}
      />
    </div>
  );

  const colorPicker = showColorPicker && (
    <div className={classes.popover}>
      <div
        className={classes.cover}
        onClick={() => setShowColorPicker(false)}
      />
      <SketchPicker
        color={color}
        onChange={(c) => {
          setColor(c.hex);
        }}
      />
    </div>
  );

  return (
    <div>
      {swatch}
      {colorPicker}
    </div>
  );
};

export default BrushColorInput;
