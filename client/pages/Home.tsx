import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getRoomPageRoute } from 'routes'
import { createRoom } from 'utils/apis/room.client.api'

const defaultRoomSettings = {
  width: 800,
  height: 800,
}

const Homepage = () => {
  const router = useRouter()
  const { data: room } = useQuery('create-room', () => {
    return createRoom(defaultRoomSettings)
  })
  if (!room) return <div>loading...</div>
  router.push(getRoomPageRoute(room._id))
  return null
}

export default Homepage
