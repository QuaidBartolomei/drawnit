import { createStyles, makeStyles } from "@material-ui/core/styles";
import BrushIcon from "@material-ui/icons/Brush";
import PanToolIcon from "@material-ui/icons/PanTool";
import React from "react";
import { CanvasTools } from "../Canvas";
import BrushColorInput from "./BrushColorInput";
import CanvasToolButton from "./CanvasToolButton";
import ChangeCanvasBackgroundButton from "./ChangeCanvasBackgroundButton";
import ClearCanvasButton from "./ClearCanvasButton";
import ShareRoomButton from "./ShareRoomButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      maxWidth: "100%",
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 8,
      border: "thin black solid",
      position: "fixed",
      top: theme.spacing(4),
      left: "50vw",
      transform: "translate(-50%)",
      zIndex: 10,
    },
  })
);

export type CanvasTool = {
  id: CanvasTools;
  label: string;
  icon: JSX.Element;
};

const canvasTools: CanvasTool[] = [
  {
    id: CanvasTools.Brush,
    icon: <BrushIcon />,
    label: "brush",
  },
  {
    id: CanvasTools.Pan,
    icon: <PanToolIcon />,
    label: "pan",
  },
];

export default function CanvasToolbar() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <BrushColorInput />
      {canvasTools.map(CanvasToolButton)}
      <ClearCanvasButton />
      <ChangeCanvasBackgroundButton />
      <ShareRoomButton />
    </div>
  );
}
