import { createStyles, makeStyles } from '@material-ui/core'
import { getRoom } from 'utils/apis/room.client.api'
import { initSocket, SocketEvents } from 'utils/apis/socket.client.api'
import { BackdroppedAlert } from 'components/BackdroppedAlert'
import Canvas from 'components/Canvas/Canvas'
import CanvasToolbar from 'components/Canvas/CanvasToolbar/CanvasToolbar'
import { RoomProvider } from 'components/Canvas/room.context'
import Room from 'interfaces/room.interface'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { scrollToMiddle } from 'utils/scroll'
import gridBackground from 'utils/grid-background'

const useStyles = makeStyles((theme) =>
  createStyles({
    canvasContainer: {
      ...gridBackground,
      width: 'max-content',
      minHeight: '100vh',
      minWidth: '100vw',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)

type Params = {
  room: string
}

interface Props {
  room: Room
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context,
) => {
  console.log('room page loading...')
  const { room: roomId } = context.params || { room: '' }
  const room = await getRoom(roomId)
  if (!room) return { notFound: true }
  console.log('creating socket')
  console.log('headers', context.req.headers)
  console.log('host', context.req.headers.host)

  return { props: { room } }
}

export default function RoomPage({ room }: Props) {
  const { _id: roomId } = room
  const [socket, setSocket] = React.useState<undefined | Socket>(undefined)

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

  if (!socket) return <div>loading...</div>
  return <Ready room={room} socket={socket} />
}

function Ready({ room, socket }: { room: Room; socket: Socket }) {
  const classes = useStyles()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
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
