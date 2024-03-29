import { createStyles, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { BackdroppedAlert } from 'components/BackdroppedAlert'
import Canvas from 'components/Canvas/Canvas'
import CanvasToolbar from 'components/Canvas/CanvasToolbar/CanvasToolbar'
import { RoomProvider } from 'components/Canvas/room.context'
import Room from 'interfaces/room.interface'
import { getRoom } from 'utils/roomApi'
import { initSocket, SocketEvents } from 'utils/socket'

const useStyles = makeStyles(() =>
  createStyles({
    pageContainer: {
      overflow: 'auto',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
    },
    canvasContainer: {
      // grid background
      backgroundImage: `linear-gradient(rgba(0,0,0, .3) .1em, transparent .1em), linear-gradient(90deg, rgba(0, 0, 0, .3) .1em, transparent .1em)`,
      backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
      backgroundSize: '3em 3em',
      backgroundColor: '#e3e2e5',

      width: 'max-content',
      minHeight: '100vh',
      minWidth: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)

function scrollToMiddle(scrollingElementId: string) {
  const scrollingElement = document.getElementById(scrollingElementId)
  if (!scrollingElement)
    return console.error(`element with id: "${scrollingElementId}" not found`)
  const viewportWidth = window.innerWidth
  const fullWidth = scrollingElement.scrollWidth
  const midpoint = (fullWidth - viewportWidth) / 2
  scrollingElement.scrollTo(midpoint, 0)
}

function Ready({ room, socket }: { room: Room; socket: Socket }) {
  const classes = useStyles()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    scrollToMiddle('root')
  }, [])
  return (
    <RoomProvider room={{ ...room }} canvasRef={canvasRef} socket={socket}>
      <CanvasToolbar />
      <BackdroppedAlert />
      <Box className={classes.pageContainer}>
        <div className={classes.canvasContainer}>
          <Canvas ref={canvasRef} />
        </div>
      </Box>
    </RoomProvider>
  )
}

export default function RoomPage() {
  const { id: roomId } = useParams<{ id: string }>()
  const [socket, setSocket] = useState<undefined | Socket>(undefined)

  const {
    data: room,
    isError,
    error,
  } = useQuery('getRoom', () => getRoom(roomId))

  useEffect(() => {
    initSocket().then((newSocket) => {
      newSocket
        .on(SocketEvents.JoinRoom, () => {
          setSocket(newSocket)
        })
        .on(SocketEvents.ReloadRoom, () => {
          window.location.reload()
        })
        .emit(SocketEvents.JoinRoom, roomId)
    })
  }, [roomId])

  if (isError) console.error('getRoom error: ', error)
  if (!room || !socket) return <div>loading...</div>
  return <Ready room={room} socket={socket} />
}
