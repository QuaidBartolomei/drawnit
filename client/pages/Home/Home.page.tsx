import { createRoom } from "utils/apis/room.client.api";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const room = await createRoom();
  if (!room) return { notFound: true };
  return {
    redirect: {
      destination: "/" + room._id,
      permanent: false,
    },
  };
};

const Homepage = () => {
  return null;
};

export default Homepage;
