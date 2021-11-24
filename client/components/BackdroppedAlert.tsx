import Backdrop from "@material-ui/core/Backdrop";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRoomDispatch, useRoomState } from "./Canvas/room.context";

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      height: "100vh",
      width: "100vw",
    },
    container: {
      zIndex: theme.zIndex.drawer + 2,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: 8,
      border: "thin black solid",
      padding: theme.spacing(2),
      maxWidth: "100vw",
    },
  })
);

export type BackdroppedAlertProps = {};

export function BackdroppedAlert() {
  const { backdropContent } = useRoomState();
  const dispatch = useRoomDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: "set_backdrop_content", payload: null });
  };

  return (
    <Backdrop
      className={classes.backdrop}
      open={backdropContent != null}
      onClick={handleClose}
    >
      <div
        className={classes.container}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {backdropContent}
      </div>
    </Backdrop>
  );
}
