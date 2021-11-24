import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";
import { useRoomDispatch, useRoomState } from "../room.context";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
    color: ({ color }: { color: string }) => ({
      width: "36px",
      height: "14px",
      borderRadius: "2px",
      background: color,
    }),
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
      margin: 16,
    },
    popover: {
      position: "absolute",
      zIndex: 2,
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  })
);

export default function BrushColorInput(
  props: React.HTMLProps<HTMLDivElement>
) {
  const { color } = useRoomState();
  const classes = useStyles({ color });
  const dispatch = useRoomDispatch();
  const setColor = (c: string) => dispatch({ type: "set_color", payload: c });
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

  const Swatch = () => (
    <div className={classes.swatch} onClick={toggleColorPicker}>
      <div className={classes.color} />
    </div>
  );

  const ColorPicker = () => (
    <div className={classes.popover}>
      <div className={classes.cover} onClick={toggleColorPicker} />
      <SketchPicker color={color} onChange={(c) => setColor(c.hex)} />
    </div>
  );

  return (
    <div>
      <Swatch />
      {showColorPicker && <ColorPicker />}
    </div>
  );
}
