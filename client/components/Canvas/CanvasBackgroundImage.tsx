import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { loadCanvasImage } from "utils/canvas.utils";
import { useRoomState } from "./room.context";

const useStyles = makeStyles((theme) =>
  createStyles({
    canvas: {
      border: "thin black solid",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
    },
  })
);

const CanvasBackgroundImage = () => {
  const classes = useStyles();
  const { canvasImage, canvasRef, backgroundImageUrl = "" } = useRoomState();

  useEffect(() => {
    if (!canvasImage) return;
    const img = new Image();
    img.src = JSON.parse(canvasImage);
    img.onload = (e) => {
      loadCanvasImage(canvasRef, img);
    };
  }, [canvasImage, canvasRef]);

  if (!backgroundImageUrl) return null;
  return (
    <img className={classes.canvas} alt="background" src={backgroundImageUrl} />
  );
};

export default CanvasBackgroundImage;
