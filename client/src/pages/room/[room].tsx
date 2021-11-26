import { createStyles, makeStyles } from '@material-ui/core'
import { BackdroppedAlert } from 'components/BackdroppedAlert'
import Canvas from 'components/Canvas/Canvas'
import CanvasToolbar from 'components/Canvas/CanvasToolbar/CanvasToolbar'
import { RoomProvider } from 'components/Canvas/room.context'
import Room from 'interfaces/room.interface'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { Socket } from 'socket.io-client'
import { getRoom } from 'utils/apis/room.client.api'
import { initSocket, SocketEvents } from 'utils/apis/socket.client.api'
import gridBackground from 'utils/grid-background'
import { scrollToMiddle } from 'utils/scroll'

const useStyles = makeStyles(() =>
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

export default function RoomPage() {
  const router = useRouter()
  const { room: roomId } = router.query as { room: string }
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
