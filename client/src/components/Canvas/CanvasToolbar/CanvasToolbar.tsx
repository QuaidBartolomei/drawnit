import { createStyles, makeStyles } from '@material-ui/core/styles'
import BrushIcon from '@material-ui/icons/Brush'
import PanToolIcon from '@material-ui/icons/PanTool'

import BrushColorInput from './BrushColorInput'
import { CanvasTool } from './canvasTool.schema'
import CanvasToolButton from './CanvasToolButton'
import ChangeCanvasBackgroundButton from './ChangeCanvasBackgroundButton'
import ClearCanvasButton from './ClearCanvasButton'
import ShareRoomButton from './ShareRoomButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      border: 'thin black solid',
      position: 'fixed',
      top: theme.spacing(4),
      left: '50vw',
      transform: 'translate(-50%)',
      zIndex: 10,
    },
  }),
)

const canvasTools: CanvasTool[] = [
  {
    id: 'brush',
    icon: <BrushIcon />,
    label: 'brush',
  },
  {
    id: 'pan',
    icon: <PanToolIcon />,
    label: 'pan',
  },
]

export default function CanvasToolbar() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <BrushColorInput />
      {canvasTools.map(CanvasToolButton)}
      <ClearCanvasButton />
      <ChangeCanvasBackgroundButton />
      <ShareRoomButton />
    </div>
  )
}
