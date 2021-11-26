import { createRoom } from 'utils/apis/room.client.api'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const room = await createRoom()
  console.log('room', room)
  if (!room) return { notFound: true }
  return {
    props: {
      roomId: room._id,
    },
  }
}

const Homepage = ({ roomId }: { roomId: string }) => {
  const router = useRouter()

  useEffect(() => {
    router.push('/room/' + roomId)
  }, [roomId, router])

  return <div>hello</div>
}

export default Homepage
