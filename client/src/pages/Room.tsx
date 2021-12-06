import { createStyles, makeStyles } from '@material-ui/core'
import { getRoom } from 'apis/room'
import { initSocket, SocketEvents } from 'apis/socket'
import { BackdroppedAlert } from 'components/BackdroppedAlert'
import Canvas from 'components/Canvas/Canvas'
import CanvasToolbar from 'components/Canvas/CanvasToolbar/CanvasToolbar'
import { RoomProvider } from 'components/Canvas/room.context'
import Room from 'interfaces/room.interface'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import gridBackground from '../utils/grid-background'

const useStyles = makeStyles(() =>
  createStyles({
    canvasContainer: {
      ...gridBackground,
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

export default function RoomPage() {
  const { id: roomId } = useParams<{ id: string }>()
  const [socket, setSocket] = useState<undefined | Socket>(undefined)

  const {
    data: room,
    isError,
    error,
  } = useQuery('getRoom', () => {
    return getRoom(roomId)
  })

  useEffect(() => {
    initSocket().then((socket) => {
      socket
        .on(SocketEvents.JoinRoom, () => {
          setSocket(socket)
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
      <div className={classes.canvasContainer}>
        <Canvas ref={canvasRef} />
      </div>
    </RoomProvider>
  )
}

function scrollToMiddle(scrollingElementId: string) {
  const scrollingElement = document.getElementById(scrollingElementId)
  if (!scrollingElement)
    return console.error(`element with id: "${scrollingElementId}" not found`)
  const viewportWidth = window.innerWidth
  const fullWidth = scrollingElement.scrollWidth
  const midpoint = (fullWidth - viewportWidth) / 2
  scrollingElement.scrollTo(midpoint, 0)
}
