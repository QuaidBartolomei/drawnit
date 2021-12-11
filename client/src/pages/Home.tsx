import { useQuery } from 'react-query'
import { useHistory } from 'react-router'
import { PageRoutes } from 'routes'
import { createRoom } from 'utils/roomApi'

const defaultRoomSettings = {
  width: 800,
  height: 800,
}

const Homepage = () => {
  const history = useHistory()
  const { data: room } = useQuery('create-room', () => {
    return createRoom(defaultRoomSettings)
  })
  if (!room) return null
  history.push(PageRoutes(room._id).ROOM)
  return null
}

export default Homepage
